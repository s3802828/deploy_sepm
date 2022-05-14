export default function Sidebar({ topicList, language_id, topic_id }) {
    return (
        <div
            className='d-flex flex-column flex-shrink-0 p-3' style={{ width: '100%' , backgroundColor: "#152039"}}>
            <a href='#' className='text-center nav-link'>
                <span style={{color: "#ffc13b"}}>CATEGORIES</span>
            </a>
            <hr style={{color: "white"}}/>
            <ul className='nav nav-pills nav-fill flex-column mb-auto'>
                <li className='nav-item text-center'>
                    <a
                        href={`/client/discussion/${language_id}/general`}
                        className={`nav-link ${'general'== topic_id && 'active'}`}
                        style={{ color: `${'general' == topic_id ? 'white' : "#ffc13b"}`, backgroundColor: `${'general' == topic_id && 'black'}` }}
                        aria-current='page'
                    >
                        General
                    </a>
                </li>
                <li className='nav-item text-center'>
                    <a
                        href={`/client/discussion/${language_id}/popular`}
                        className={`nav-link ${'popular' == topic_id && 'active'}`}
                        style={{ color: `${'popular' == topic_id ? 'white' : "#ffc13b"}`, backgroundColor: `${'popular' == topic_id && 'black'}` }}
                        aria-current='page'
                    >
                        Popular
                    </a>
                </li>
                {topicList && topicList.map((element) =>
                    <li className='nav-item text-center'>
                        <a
                            href={`/client/discussion/${language_id}/${element._id}`}
                            className={`nav-link link-dark ${element._id == topic_id && 'active'}`}
                            style={{ color: `${element._id == topic_id ? 'white' : "#ffc13b"}`, backgroundColor: `${element._id == topic_id && 'black'}` }}
                            aria-current='page'
                        >
                            {element.name}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}