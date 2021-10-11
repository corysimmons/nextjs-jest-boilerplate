import {useQuery, gql, useMutation} from '@apollo/client'
import {useState} from 'react'

import Blurb from '../components/Blurb';
import useMounted from '../hooks/useMounted'

export const BOOK_QUERY = gql`
  query Books {
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
  const { loading, error, data, refetch } = useQuery(BOOK_QUERY);
  const [mutate] = useMutation(ADD_BOOK);

  const [formData, setFormData] = useState({
    title: '',
    author: ''
  })

  if (loading || error || !data) {
    return null
  }
  
  return (
    mounted && (
      <div>
        <h1 data-testid="heading">index page</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <Blurb quote="MMmmm good" />

        <form data-testid="form" onSubmit={async e => {
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
            data-testid="title"
            placeholder="Book name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          /><br />
          <input
            data-testid="author"
            placeholder="Author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          /><br />
          <button type="submit">Submit</button>
        </form>

        {data.books[3] && <p data-testid="result">{data.books[3]?.title} added!</p>}
      </div>
    )
  );
}

export default IndexPage