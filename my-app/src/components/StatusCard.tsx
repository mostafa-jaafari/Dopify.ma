
export default function StatusCard({LABEL, NUMBER, CLASSNAME, ICON}:{ICON:React.ComponentType<React.SVGProps<SVGSVGElement>>;CLASSNAME:string;LABEL:string;NUMBER:string;}){
    return (
        <main className={`bg-neutral-900/20 hover:bg-neutral-900 flex justify-between items-start p-4 border border-neutral-600 shadow rounded-lg ${CLASSNAME}`}>
            <section className="text-xl">
                <h1 className="">{LABEL}</h1>
                <span>{NUMBER}</span>
            </section>
            <ICON /> 
        </main>
    )
}