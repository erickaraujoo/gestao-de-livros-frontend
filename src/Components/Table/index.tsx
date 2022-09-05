import { useState, useEffect } from 'react';
import { TableContainerLogs, TablePageableContainer } from './styles';
import { useSelector } from 'react-redux';
import { IListSelectors } from '../../models/redux/selectors';
import { returnStatusText } from '../../utils';
import { IoIosArrowUp } from 'react-icons/io';
import { IoIosArrowDown } from 'react-icons/io';
import { formatJsonLog } from './../../utils/index';
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { findAllLogs } from '../../store/modules/logs/action';
import { IPageableResponseLog } from './../../models/logs/index';

interface ITableHeader {
  header: string[];
}

interface IPageableTableContent {
  content: object[];
  loading: boolean;
  handleOnClick: Function;
}

interface IPageableTableFooter {
  totalElements: number;
  currentPagination: number;
  totalPages: number;
  handleCurrentPagination: any;
}

interface IPageableTableWithHeaderAndFooter {
  header: string[];
  content: {}[];
  footer: {
    totalElements: number;
    currentPagination: number;
    totalPages: number;
    handleCurrentPagination: Function;
  };

  loading: boolean;

  handleOnClick: Function;
}

const TableRowLoadingData = () => (
  <tr id="loading-data">
    <td>
      <p>Carregando dados...</p>
    </td>
  </tr>
);

const TableRowNoContent = () => (
  <tr id="no-content">
    <td>
      <p>Nenhum registro encontrado</p>
    </td>
  </tr>
);

const PageableTableHeader: React.FC<ITableHeader> = ({ header }) => (
  <thead>
    <tr>
      {header.map((title, index) => (
        <th key={index}>
          <p>{title}</p>
        </th>
      ))}
    </tr>
  </thead>
);

const PageableTableContent: React.FC<IPageableTableContent> = ({ content, loading, handleOnClick }) => (
  <tbody>
    {content &&
      content.map((data, index) => (
        <tr
          className="tr-content"
          key={index}
          id={index.toString()}
          onClick={(event) => handleOnClick(event.currentTarget.id)}
        >
          {Object.values(data).map((value, index) => (
            <td key={index}>
              <p>{value}</p>
            </td>
          ))}
        </tr>
      ))}

    {loading && <TableRowLoadingData />}

    {!loading && !content.length && <TableRowNoContent />}
  </tbody>
);

const PageableTableFooter: React.FC<IPageableTableFooter> = ({
  totalElements,
  currentPagination,
  totalPages,
  handleCurrentPagination,
}) => (
  <tfoot>
    <tr>
      <td>
        <div id="total-count">
          <p>Total: {totalElements}</p>
        </div>
        <div id="pagination">
          <MdFirstPage onClick={() => handleCurrentPagination(0)} />
          <MdNavigateBefore onClick={() => currentPagination !== 0 && handleCurrentPagination(currentPagination - 1)} />
          <p>
            {totalPages !== 0 ? currentPagination + 1 : currentPagination} de {totalPages}
          </p>
          <MdNavigateNext
            onClick={() =>
              totalPages !== 0
                ? currentPagination + 1 !== totalPages && handleCurrentPagination(currentPagination + 1)
                : null
            }
          />
          <MdLastPage onClick={() => handleCurrentPagination(totalPages !== 0 ? totalPages - 1 : totalPages)} />
        </div>
      </td>
    </tr>
  </tfoot>
);

export const PageableTableWithHeaderAndFooter: React.FC<IPageableTableWithHeaderAndFooter> = ({ ...rest }) => {
  const { header, content, footer, loading, handleOnClick } = rest;
  const { currentPagination, handleCurrentPagination, totalElements, totalPages } = footer;

  return (
    <TablePageableContainer totalHeader={header.length}>
      <PageableTableHeader header={header} />

      <PageableTableContent content={content} loading={loading} handleOnClick={handleOnClick} />

      <PageableTableFooter
        totalElements={totalElements}
        currentPagination={currentPagination}
        totalPages={totalPages}
        handleCurrentPagination={handleCurrentPagination}
      />
    </TablePageableContainer>
  );
};

export const TableLogs: React.FC = () => {
  const dispatch = useDispatch();

  const [detailsLog, setDetailsLog] = useState(-1);

  const { data, loading } = useSelector((state: IListSelectors) => state.logs);

  const handlePaginationLogs = (value: number) => setPaginationLogs(value);

  const handleDetailsLog = (value: number) => setDetailsLog(value);

  const [paginationLogs, setPaginationLogs] = useState(0);

  const [totalSize] = useState(10);

  useEffect(() => {
    dispatch(findAllLogs({ page: paginationLogs, size: totalSize, sort: 'id' }));
  }, [dispatch, paginationLogs, totalSize]);

  const instanceOfPageableLog = (data: any): data is IPageableResponseLog => data;

  return (
    <TableContainerLogs cellPadding="0" cellSpacing="0">
      <PageableTableHeader header={['Rota', 'Usuário', 'Horário', 'Status']} />
      <tbody>
        {instanceOfPageableLog(data.response) &&
          Array.isArray(data.response.content) &&
          data.response.content.map(({ route, user, request, response, createdAt, statusCode }, index) => (
            <tr className="tr-content" key={index}>
              <td>
                <table cellPadding="0" cellSpacing="0">
                  <tbody>
                    <tr
                      onClick={() =>
                        detailsLog === -1 || detailsLog !== index ? handleDetailsLog(index) : handleDetailsLog(-1)
                      }
                    >
                      <td>
                        <p>{route}</p>
                      </td>
                      <td>
                        <p>{user.name}</p>
                      </td>
                      <td>
                        <p>{new Date(createdAt).toLocaleString()}</p>
                      </td>
                      <td>
                        <p>{returnStatusText(statusCode)}</p>
                      </td>
                      {detailsLog === index ? (
                        <td id="icon-arrow">
                          <IoIosArrowUp />
                        </td>
                      ) : (
                        <td id="icon-arrow">
                          <IoIosArrowDown />
                        </td>
                      )}
                    </tr>
                    {detailsLog === index && (
                      <tr id="details-log">
                        <td>
                          <div>
                            <p>Entrada</p>
                            <pre>
                              <code>{formatJsonLog(request)}</code>
                            </pre>
                          </div>
                          <div>
                            <p>Saída</p>
                            <pre>
                              <code>{formatJsonLog(response)}</code>
                            </pre>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}

        {loading && <TableRowLoadingData />}

        {data.success &&
          instanceOfPageableLog(data.response) &&
          Array.isArray(data.response.content) &&
          !data.response.content.length && <TableRowNoContent />}
      </tbody>
      <PageableTableFooter
        totalElements={instanceOfPageableLog(data.response) ? data.response.totalElements : 0}
        currentPagination={paginationLogs}
        totalPages={instanceOfPageableLog(data.response) ? data.response.totalPages : 1}
        handleCurrentPagination={handlePaginationLogs}
      />
    </TableContainerLogs>
  );
};
