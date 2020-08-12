import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  text-align: center;
  color: white;
  object-fit: cover;
`

const Image = styled.img`
  width: 100%;
`

const Label = styled.div`
  position: absolute;
  bottom: 8px;
  left: 16px;
`

type TileProps = {
  img: string
  text: string
}

const Tile = ({ img, text }: TileProps) => {
  return (
    <Container>
      <Image src={img} alt={img} />
      <Label>{text}</Label>
    </Container>
  )
}

export const Gallery = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(6, 200px);
  grid-gap: 1rem;
  grid-auto-flow: dense;
`

export default Tile
