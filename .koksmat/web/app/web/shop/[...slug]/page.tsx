import React from 'react'

export default function Route(props: { params: { slug: string[] } }) {
  const { params: { slug } } = props;
  return (
    <div>{slug.join("/")}</div>
  )
}
