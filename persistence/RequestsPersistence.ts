import {RequestInfo} from "src/requests/models/RequestInfo"

interface RequestsPersistence {

  getServiceName(): string

  init(): Promise<any>

  getRequest(tabId: string): Promise<string>

  saveRequest(requestInfo: RequestInfo): Promise<any>

  compactDb(): Promise<any>

}

export default RequestsPersistence;
