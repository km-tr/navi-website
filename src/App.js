import React from 'react'
import { NotFoundBoundary, View, useLoadingRoute } from 'react-navi'
import BusyIndicator from 'react-busy-indicator'
import Prism from 'prismjs'
import { DocProvider, Doc } from '@frontarm/doc'

const languages = {
  'jsx': 'jsx',
  'js': 'jsx',
  'html': 'markup',
  'css': 'css',
}
const grammars = {
  'jsx': 'javascript',
  'html': 'html',
  'css': 'css',
}

export function App() {
  let loadingRoute = useLoadingRoute()

  return (
    <DocProvider components={{
      Demoboard: ({ editorPathname, id, style, sources }) => {
        let filename = editorPathname || Object.keys(sources)[0]
        let extension = filename.split('.').reverse()[0]
        let language = languages[extension]

        return (
          <Doc.Gutter horizontal>
            <div className='navi-website-code demoboard'>
              <Doc.Gutter Component='pre' half className={'language-'+language}>
                <code
                  id={id}
                  style={style}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(sources[filename], Prism.languages[grammars[language]], language)
                  }}
                />
              </Doc.Gutter>
            </div>
          </Doc.Gutter>
        )
      },

      code: ({ highlightedSource, language='text', id, style }) =>
        <Doc.Block className='navi-website-code'>
          <Doc.Gutter Component='pre' half className={'language-'+language}>
            <code
              id={id}
              style={style}
              dangerouslySetInnerHTML={{
                __html: highlightedSource
              }}
            />
          </Doc.Gutter>
        </Doc.Block>
    }}>
      <BusyIndicator isBusy={!!loadingRoute} />
      <NotFoundBoundary render={() => <h1>Not Found</h1>}>
        <View />
      </NotFoundBoundary>
    </DocProvider>
  )
}
