import styled from 'styled-components';
import { device, theme } from './../../styles/global';

export const TablePageableContainer: any = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px ${theme.colors.blackWithMediumOpacity};
  border-radius: 5px;

  thead {
    tr {
      display: flex;
      background: ${theme.colors.blue};
      min-height: 50px;
      border-radius: 5px 5px 0 0;

      th {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        word-wrap: break-word;
        width: ${(props: { totalHeader: number }) => `calc(100% / (${props.totalHeader}))`};

        p {
          font-weight: 600;
          color: ${theme.colors.white};
          text-align: center;
          word-break: break-all;
        }
      }
    }
  }

  tbody {
    tr.tr-content {
      display: flex;
      min-height: 50px;
      border-radius: 5px 5px 0 0;
      cursor: pointer;

      td {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        word-wrap: break-word;
        width: ${(props: { totalHeader: number }) => `calc(100% / (${props.totalHeader}))`};

        p {
          text-align: center;
          word-break: break-all;
        }
      }

      & + tr {
        border-top: solid 0.5px rgb(204, 204, 204);
      }

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    tr#loading-data,
    tr#no-content {
      height: 80px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.125rem;
        text-align: center;
      }
    }
  }

  tfoot {
    tr {
      display: flex;

      td {
        border-top: solid 0.5px rgb(204, 204, 204);
        min-height: 60px;
        padding: 0 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      div#pagination {
        display: flex;
        align-items: center;

        svg:first-child {
          margin-left: 0px;
        }

        svg {
          cursor: pointer;
        }

        svg,
        p {
          margin-left: 5px;
        }

        p {
          color: ${theme.colors.blackCharcoal};
        }
      }
    }
  }
`;

export const TableContainerLogs = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 5px ${theme.colors.blackWithMediumOpacity};
  border-radius: 5px;

  thead {
    tr {
      display: flex;
      background: ${theme.colors.blue};
      min-height: 50px;
      border-radius: 5px 5px 0 0;

      th {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        word-wrap: break-word;

        p {
          font-weight: 600;
          color: ${theme.colors.white};
          text-align: center;
        }
      }
    }
  }

  tbody {
    > tr.tr-content {
      display: flex;

      > td {
        display: flex;
        width: 100%;

        table {
          width: 100%;

          tbody {
            tr {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              max-width: 1100px;

              &:hover {
                background: rgba(0, 0, 0, 0.025);
              }

              td {
                min-height: 50px;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;

                p {
                  width: 100%;
                  word-wrap: break-word;
                  text-align: center;
                }
              }

              td#icon-arrow {
                padding: 0px;
                width: auto;
                position: absolute;
                right: 20px;
                top: auto;
                bottom: auto;
              }
            }

            tr#details-log {
              width: 100%;

              td {
                width: 100%;
                flex-direction: column;
                padding: 25px 0;
                overflow: auto;
                background: rgba(0, 0, 0, 0.025);

                div {
                  width: 100%;
                  display: flex;
                  padding: 25px 0;
                  align-items: center;
                  justify-content: space-between;

                  p,
                  pre code {
                    text-align: center;
                    white-space: pre-wrap;
                    word-break: break-all;
                  }

                  p,
                  pre {
                    min-width: 50%;
                    width: 100%;
                    padding: 0 20px;
                  }
                }

                > div + div {
                  border-top: solid 0.5px rgb(204, 204, 204);
                }
              }
            }
          }
        }
      }
    }

    tr#loading-data,
    tr#no-content {
      height: 80px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 1.125rem;
        text-align: center;
      }
    }

    > tr + tr {
      border-top: solid 0.5px rgb(204, 204, 204);
    }
  }

  thead tr th,
  tbody tr td {
    width: 33.33%;
  }

  tbody tr td table tbody tr td:nth-child(3),
  thead tr th:nth-child(3) {
    display: none;
  }

  @media ${device.tablet} {
    tbody tr td table tbody tr td:nth-child(3),
    thead tr th:nth-child(3) {
      display: flex;
    }

    tbody tr td table tbody tr td,
    thead tr th {
      width: 25%;
    }
  }

  tfoot {
    tr {
      display: flex;

      td {
        border-top: solid 0.5px rgb(204, 204, 204);
        min-height: 60px;
        padding: 0 20px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      div#pagination {
        display: flex;
        align-items: center;

        svg:first-child {
          margin-left: 0px;
        }

        svg {
          cursor: pointer;
        }

        svg,
        p {
          margin-left: 5px;
        }

        p {
          color: ${theme.colors.blackCharcoal};
        }
      }
    }
  }
`;
