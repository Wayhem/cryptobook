import { Breakpoints } from 'Models/constants/breakpoints'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 4rem 8rem;
  width: 100%;

  @media (max-width: ${Breakpoints.tablet}px) {
    padding: 1.5rem 3rem;
  }

  @media (max-width: ${Breakpoints.mobile}px) {
    padding: 1rem 2rem;
  }
`

export const Book = styled.div`
  margin: 0 auto;
  max-width: 1280px;
`

export const PricesContainer = styled.div`
  display: flex;

  @media (max-width: ${Breakpoints.tablet}px) {
    flex-direction: column-reverse;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`
