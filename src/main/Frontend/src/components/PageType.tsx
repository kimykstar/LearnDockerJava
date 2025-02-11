type PageTypeProps = {
    pageType: string;
};

const PageType = ({ pageType }: PageTypeProps) => {
    return (
        pageType === 'quiz' && (
            <span className='inline-flex mr-2 items-center justify-center text-[10px] border h-6 rounded-md px-1 py-0.5 text-blue-500 border-blue-300'>
                {pageType}
            </span>
        )
    );
};

export default PageType;
