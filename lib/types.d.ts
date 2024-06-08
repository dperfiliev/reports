interface SourceT {
  id: string,
  attributes: {
    name: string
  }
}

interface SourcesArrayT {
  data: {
    sources: {
      meta: {
        pagination: {
          total: number
        }
      }
      data: SourceT[]
    }
  }
}

interface PeriodT {
  id: string,
  attributes: {
    value: string
  }
}

interface PeriodsArrayT {
  data: {
    periods: {
      meta: {
        pagination: {
          total: number
        }
      }
      data: PeriodT[]
    }
  }
}

interface TextTypeT {
  id: string,
  attributes: {
    name: string
  }
}

interface TextTypesArrayT {
  data: {
    textTypes: {
      meta: {
        pagination: {
          total: number
        }
      }
      data: TextTypeT[]
    }
  }
}

interface ReportT {
  id: string,
  attributes: {
    title: string | undefined,
    description: string,
    pages: number | undefined,
    output: string | undefined,
    guber: {
      data: {
        id: string
      } | undefined
    },
    source: {
      data: {
        id: string
        attributes: {
          name: string
        }
      } | undefined
    }
    img: {
      data: {
        attributes: {
          url: string
        }
      } | undefined
    }
    text_type: {
      data: {
        id: string
        attributes: {
          name: string
        }
      } | undefined
    }
    periods: {
      data: {
        id: string
        attributes: {
          value: string
        }
      } | undefined
    }
    file: {
      data: {
        id: string,
        attributes: {
          name: string,
          url: string
        }
      } | undefined
    }
    fileSecond: {
      data: {
        id: string,
        attributes: {
          name: string,
          url: string
        }
      } | undefined
    }
    contents: [
      {
        id: string,
        pageNumber: number | undefined
        title: string | undefined
      } | undefined
    ]
    contentsSecond: [
      {
        id: string,
        pageNumber: number | undefined
        title: string | undefined
      } | undefined
    ]
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

interface ReportIdT {
  data: {
    report: {
      data: ReportT
    }
  }
}


interface GuberT {
  id: string,
  attributes: {
    name: string,
    description: string,
    periods: {
      data: PeriodT[]
    } | undefined
    img: {
      data: {
        attributes: {
          url: string
        } 
      } | undefined
    },
    rank: string,
    service: string,
    histories: HistoryT[]
  }
}

interface HistoryT {
  year: string,
  text: string
} 

interface GuberIdT {
  data: {
    guber: {
      data: GuberT
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