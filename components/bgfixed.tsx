import Image from "next/image"

export default function BgFixed(){
    return(
        <div className="mx-auto relative flex justify-center">
            <div className="mx-auto fixed hidden lg:block lg:mt-[6vw] 2xl:mt-[4vw] h-[60vw] w-[60vw]">
                <Image src="/images/bg.png" alt="" fill sizes="100vw" className="bg-no-repeat bg-center"/>
            </div>
        </div>
    )
}
