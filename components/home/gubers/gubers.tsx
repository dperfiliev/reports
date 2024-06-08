
import GubersFindOut from "./gubersFindOut"

import GubersListScroll from "./GubersListScroll"
import GubersServer from "./GubersServer"

export default function Gubers(){

    return(
        <div className="mt-8 md:mt-16">
            <div className="mb-3">
                <h1 className="custom-text-section">
                    ГУБЕРНАТОРЫ ЕНИСЕЙСКОЙ ГУБЕРНИИ
                </h1>
            </div>
           
                <GubersListScroll>
                    <GubersServer />
                </GubersListScroll>
        
            <GubersFindOut />
        </div>
    )
}
