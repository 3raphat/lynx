export async function getStars(url: string) {
  const res = await fetch(
    `https://api.github.com/repos/${url.replace('https://github.com/', '')}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await res.json()

  return data.stargazers_count as number
}
