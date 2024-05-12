interface ReportT {
    id: string,
    attributes: {
        title: string,
        description: string,
        pages: number | null,
        output: string | null,
        source: string | null,
        img: {
          data: {
            attributes: {
              url: string
            } | null
          }
        } 
    }
}

interface ReportsArrayT {
    data: {
        reports: {
            meta: {
              pagination: {
                total: number
              }
            }
            data: ReportT[]
          }
    }
}

interface GuberT {
  id: string,
  attributes: {
      name: string,
      description: string,
      period: string,
      img: {
        data: {
          attributes: {
            url: string
          } | null
        }
      } 
  }
}

interface GubersArrayT {
  data: {
      gubers: {
          meta: {
            pagination: {
              total: number
            }
          }
          data: GuberT[]
        }
  }
}

interface CenturyT {
  id: string,
  attributes: {
      century: number,
      value: string
  }
}

interface CenturiesArrayT {
  data: {
      centuries: {
          meta: {
            pagination: {
              total: number
            }
          }
          data: CenturyT[]
        }
  }
}