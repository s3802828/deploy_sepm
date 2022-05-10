export default function Sidebar({ topicList, language_id, topic_id }) {
    return (
        <div
            className='d-flex flex-column flex-shrink-0 p-3 bg-light' style={{ width: '100%' }}>
            <a href='#' className='text-center nav-link link-dark'>
                <span>CATEGORIES</span>
            </a>
            <hr />
            <ul className='nav nav-pills nav-fill flex-column mb-auto'>
                <li className='nav-item text-center'>
                    <a
                        href={`/client/discussion/${language_id}/general`}
                        className={`nav-link link-dark ${'general'== topic_id && 'active'}`}
                        style={{ backgroundColor: `${'general' == topic_id && 'black'}` }}
                        aria-current='page'
                    >
                        General
                    </a>
                </li>
                <li className='nav-item text-center'>
                    <a
                        href={`/client/discussion/${language_id}/popular`}
                        className={`nav-link link-dark ${'popular' == topic_id && 'active'}`}
                        style={{ backgroundColor: `${'popular' == topic_id && 'black'}` }}
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
                            style={{ backgroundColor: `${element._id == topic_id && 'black'}` }}
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