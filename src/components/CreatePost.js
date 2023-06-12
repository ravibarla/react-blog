import { firestore } from '../firebase';
import { useFormInput } from '../hooks';

function CreatePost() {
  const title = useFormInput('');
  const subTitle = useFormInput('');
  const content = useFormInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('title', title);
    console.log('subtitle', subTitle);
    console.log('content', content);

    firestore.collection('posts').add({
      title: title.value,
      subTitle: subTitle.value,
      content: content.value,
      createdAt: new Date(),
    });
  };
  return (
    <div className="create-post">
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>title</label>
          <input {...title} />
        </div>
        <div className="form-field">
          <label>subtitle</label>
          <input {...subTitle} />
        </div>
        <div className="form-field">
          <label>content</label>
          <textarea {...content} />
        </div>
        <button className="create-post-btn">create post </button>
      </form>
    </div>
  );
}

export default CreatePost;
