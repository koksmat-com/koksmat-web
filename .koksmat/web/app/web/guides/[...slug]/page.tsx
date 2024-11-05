import React from 'react'

export default function Page(
  props: { params: { slug: string[] } }
) {
  const [page] = props.params.slug
  return (
    <div>Page</div>
  )
}
