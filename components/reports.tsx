import ReportsContainer from "./reportscontainer"
import FindOut from "./findout"

export default function Reports(){
    return(
        <div className="mt-8 md:mt-16">
            <div className="mb-3">
                <h1 className="font-upper text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    ПОСЛЕДНИЕ ОТЧЁТЫ 
                </h1>
            </div>
            <ReportsContainer />
            <FindOut />
        </div>
    )
}