import Image from "next/image"

export default function BgFixed(){
    return(
        <div className="mx-auto flex justify-center items-center w-screen h-screen fixed z-0">
            <div className="relative mt-[0vw] lg:mt-[30vw] 2xl:mt-[20vw] h-[60vw] w-[60vw] flex justify-center">
                <Image src="/images/bg.png" alt="" fill sizes="100vw" className="bg-no-repeat bg-center"/>
            </div>
        </div>
    )
}
