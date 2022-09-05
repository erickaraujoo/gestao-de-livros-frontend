export const formatLog = (response: any): any => ({
  request: response.config.data || '{}',
  response: JSON.stringify(response.data),
  statusCode: response.status,
  statusText: response.statusText,
  method: response.config.method.toString().toUpperCase(),
  route: response.config.url,
  user: {
    id: response.config.headers.user,
  },
});
