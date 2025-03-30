



export default function page({params}){
    const PageID = params.pageid;
    switch (PageID) {
        case '/profile':
            return (
                <main>
                    {PageID}
                </main>
            )
        default:
            return (
                <main>
                    Not Founded Page
                </main>
            )
    }
}