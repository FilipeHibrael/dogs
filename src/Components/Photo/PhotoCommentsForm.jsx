import React from 'react';
import Envair from '../../Assets/enviar.svg?react';
import useFetch from '../../Hooks/useFetch';
import { COMMENT_POST } from '../../api';
import Error from '../Helper/Error'

function PhotoCommentsForm({ id, setComments }) {
  const [comment, setComment] = React.useState('');
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault()
    const {url, options} = COMMENT_POST(id, {comment})
    const {response, json} = await request(url, options)
    if(response.ok) {
        setComment('')
        setComments((comments) => [...comments, json])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <Envair />
      </button>
      <Error error={error}/>
    </form>
  );
}

export default PhotoCommentsForm;
