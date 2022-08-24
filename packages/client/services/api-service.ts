const domain = process.env.REACT_APP_API_DOMAIN;

export async function httpPost<T>(relativeUrl: string, body: T) {
  const response: Response = await fetch(`${domain}${relativeUrl}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

export async function httpGet(relativeUrl: string) {
  const response: Response = await fetch(`${domain}${relativeUrl}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}

export async function httpPatch<T>(relativeUrl: string, body: T) {
  const response: Response = await fetch(`${domain}${relativeUrl}`, {
    method: "patch",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  return await response.json();
}

export async function httpDelete(relativeUrl: string) {
  const response: Response = await fetch(`${domain}${relativeUrl}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}
