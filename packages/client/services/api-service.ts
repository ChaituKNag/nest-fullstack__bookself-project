export async function httpPost<T>(url: string, body?: T) {
  const response: Response = await fetch(`${url}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: typeof body === "string" ? body : JSON.stringify(body)
  });

  return await response.json();
}

export async function httpGet(url: string) {
  const response: Response = await fetch(`${url}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}

export async function httpPatch<T>(url: string, body: T) {
  const response: Response = await fetch(`${url}`, {
    method: "patch",
    headers: {
      "Content-Type": "application/json"
    },
    body: typeof body === "string" ? body : JSON.stringify(body)
  });

  return await response.json();
}

export async function httpDelete(url: string) {
  const response: Response = await fetch(`${url}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return await response.json();
}
