import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup, getByTestId } from 'react-testing-library'
import Layout from '@src/Layout'
import propAliases from './propAliases'
import { Composition } from '..'

const defaultValue = 10
const explicitValues = {
  area: 'first',
  // prettier-ignore
  areas: 'first',
  // prettier-ignore
  template: "first",
  templateCols: '500px',
  templateRows: '500px',
  col: '1 / auto',
  colStart: '2',
  colEnd: '3',
  gap: '20px 25px',
  gutter: '20px 25px',
  margin: ['0px', 10],
  flexDirection: ['row', 'column'],
  flexShrink: ['0', '1'],
  flexGrow: ['1', '0'],
  flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
  row: '1 / auto',
  rowStart: '2',
  rowEnd: '3',
  autoFlow: ['row', 'column', 'row dense'],
  align: 'center',
  alignItems: 'flex-end',
  alignContent: 'flex-start',
  justify: 'center',
  justifyItems: 'flex-end',
  justifyContent: 'flex-start',
  place: 'center center',
  placeItems: 'flex-end flex-end',
  placeContent: 'flex-start flex-start',
}

describe('Prop aliases', () => {
  afterEach(cleanup)

  Object.keys(propAliases).forEach((propAliasName) => {
    it(propAliasName, () => {
      const propValue = explicitValues[propAliasName] || defaultValue
      const props = {
        [propAliasName]: propValue,
      }
      const { container } = render(
        <Composition data-testid="composition" areas="first" {...props}>
          {({ First }) => <First>{propAliasName}</First>}
        </Composition>,
      )
      const domElement = getByTestId(container, 'composition')

      /* Assertion */
      const { output, transformValue } = propAliases[propAliasName]
      const expectedValue = transformValue
        ? transformValue(propValue, Layout)
        : propValue

      output.forEach((cssPropName) => {
        expect(domElement).toHaveStyle(`${cssPropName}:${expectedValue}`)
      })
    })
  })
})
