import {useQuery, gql, useMutation} from '@apollo/client'
import {useState} from 'react'

import Blurb from '../components/Blurb';
import useMounted from '../hooks/useMounted'

export const BOOK_QUERY = gql`
  query BookTitles {
    books {
      title
      author
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBook($book: BookInput) {
    addBook(book: $book) {
      title
      author
    }
  }
`;

const IndexPage = () => {
  const mounted = useMounted()
  const { data, refetch } = useQuery(BOOK_QUERY);
  const [mutate, { data: newData }] = useMutation(ADD_BOOK);

  const [formData, setFormData] = useState({
    title: '',
    author: ''
  })

  if (!data) {
    return null
  }
  
  return (
    mounted && (
      <div>
        <h1 data-testid="heading">index page</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Blurb quote="MMmmm good" />

        <form onSubmit={async e => {
          e.preventDefault()
          await mutate({variables: {
            book: {
              title: formData.title,
              author: formData.author,
            }
          }})
          refetch()
        }}>
          <input
            placeholder="Book name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          /><br />
          <input
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  );
}

export default IndexPage