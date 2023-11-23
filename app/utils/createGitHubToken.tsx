export async function createTokenWithCode(code: string) {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=95b2ac9d3f80a5af6c72` +
      `&client_secret=8446664fed8782e9d636732dfddd3b1bc97b3250` +
      `&code=${code}`;
  
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    return res.json();
  }