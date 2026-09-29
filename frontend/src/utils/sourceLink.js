export function hostnameOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, '') } catch { return url }
}

export function sourceLabel(url) {
  if (!url) return ''
  if (url.includes('instagram.com')) return '📷 인스타그램'
  if (url.includes('tiktok.com')) return '🎵 틱톡'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return '▶️ 유튜브'
  if (url.includes('blog.naver.com')) return '📝 네이버 블로그'
  return '🔗 웹페이지'
}

export function isLinkOnly(r) {
  return !!r.sourceUrl && !(r.ingredients?.length) && !(r.steps?.length)
}

export function isYouTube(url) {
  return url.includes('youtube.com') || url.includes('youtu.be')
}

export function youtubeEmbedUrl(url) {
  try {
    const u = new URL(url)
    let id = null
    if (u.hostname.includes('youtu.be')) {
      id = u.pathname.slice(1).split('/')[0]
    } else if (u.searchParams.get('v')) {
      id = u.searchParams.get('v')
    } else {
      const match = u.pathname.match(/\/(shorts|embed|live)\/([^/?]+)/)
      if (match) id = match[2]
    }
    return id ? `https://www.youtube.com/embed/${id}` : null
  } catch { return null }
}
