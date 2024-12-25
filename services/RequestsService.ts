import _ from 'lodash'
import { RequestInfo } from 'src/requests/models/RequestInfo'
import RequestsPersistence from 'src/requests/persistence/RequestsPersistence'
import { TabAndTabsetId } from 'src/tabsets/models/TabAndTabsetId'
import { useTabsetsStore } from 'src/tabsets/stores/tabsetsStore'

let db: RequestsPersistence = null as unknown as RequestsPersistence

export function useRequestsService() {
  const init = async (storage: RequestsPersistence) => {
    db = storage
    await db.init()
    // initListeners()
    console.debug(` ...initialized requests: Service`, '✅')
  }

  const logWebRequest = (details: chrome.webRequest.WebResponseHeadersDetails) => {
    const tabsForUrl = useTabsetsStore().tabsForUrl(details.url)
    _.forEach(tabsForUrl, (tabAndTabsetId: TabAndTabsetId) => {
      db.saveRequest(
        new RequestInfo(tabAndTabsetId.tab.id, details.statusCode, details.responseHeaders || []),
      )
        .then(() => console.debug('added request'))
        .catch((err) => console.warn('error in logWebRequest', err))
    })
  }

  const getWebRequestFor = (tabId: string): Promise<RequestInfo> => {
    return db.getRequest(tabId)
  }

  return {
    init,
    logWebRequest,
    getWebRequestFor,
  }
}
