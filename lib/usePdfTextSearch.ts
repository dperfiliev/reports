import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import type { TextItem } from 'pdfjs-dist/types/src/display/api.js';

export const usePdfTextSearch = (file: string, searchString: string) => {
  const [pages, setPages] = useState<string[]>([]);
  const [resultsList, setResultsList] = useState<number[]>([]);

  useEffect(() => {
    if (!searchString || searchString.length === 0) {
        setResultsList([]);
        return;
    }

    void pdfjs.getDocument(file).promise.then((docData) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const pageCount = docData._pdfInfo.numPages;

      const pagePromises = Array.from(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { length: pageCount },
        (_, pageNumber) => {
          return docData.getPage(pageNumber + 1).then((pageData) => {
            return pageData.getTextContent().then((textContent) => {
              return (textContent.items as TextItem[]).map(({ str }) => str.toLowerCase()).join(" ");
            });
          });
        }
      );

      return Promise.all(pagePromises).then((pages) => {
        setPages(pages);
      });
    });
  }, [file, searchString]);

  useEffect(() => {
    if (!searchString || searchString.length === 0) {
      setResultsList([]);
      return;
    }

    /* 
      Currently this regex is case-insensitive. This could be extended to be configurable. 
      Or could be extended to be a fuzzy search. Fuzzy search would need a more 
      complex return from the hook to be able to highlight the found term(s) in the view.
      EX: resultsList = Array<{ pageNumber: number, matchedTerms: Array<string> }>
    */
    const regex = new RegExp(`${searchString}*`, "i");
    const updatedResults: number[] = [];

    pages.forEach((text, index) => {
      if (regex.test(text.toLocaleLowerCase())) {
        updatedResults.push(index + 1);
      }
    });

    setResultsList(updatedResults);
  }, [pages, searchString]);

  return resultsList;
};