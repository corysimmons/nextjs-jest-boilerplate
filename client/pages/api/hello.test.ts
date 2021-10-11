import axios from 'axios'

test("returns john doe", async () => {
  const {data} = await axios('http://localhost:3000/api/hello')
  expect(data).toEqual({name: 'John Doe'})
});
