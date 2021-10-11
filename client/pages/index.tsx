import {useQuery, gql} from '@apollo/client'
import Blurb from '../components/Blurb';

import useMounted from '../hooks/useMounted'

export const BOOK_QUERY = gql`
  query BookTitles {
    books {
      title
    }
  }
`;

const IndexPage = () => {
  const mounted = useMounted()
  const { data } = useQuery(BOOK_QUERY);

  if (!data) {
    return null
  }
  
  return mounted && (
    <div>
      <h1 data-testid="heading">index page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Blurb quote="MMmmm good" />
    </div>
  )
}

export default IndexPage