import Image from "next/image"

export default function BgFixed(){
    return(
        <div className="absolute w-screen h-screen">
            <div className="mx-auto w-full h-full relative flex justify-center">
                <div className="mx-auto fixed hidden lg:block lg:mt-[6vw] 2xl:mt-[4vw] h-[60vw] w-[60vw]">
                    <Image src="/images/bg.png" alt="" fill sizes="50vw" className="bg-no-repeat bg-center" priority={true} />
                </div>
            </div>
        </div>
    )
}
