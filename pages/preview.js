import Frame from '../components/Admin/Frame.js'
import Display from '../components/Display/Display.js'

const Preview = props => (
  <Frame>
    <h1>Preview</h1>
    <p>Below is a preview of the display as it will appear on the TV.</p>
    <div className="preview">
      <Display />
    </div>
    <style jsx>
      {`
        h1 {
          font-family: 'Open Sans', sans-serif;
          font-size: 24px;
          color: #4f4f4f;
          margin: 0px;
        }
        p {
          font-family: 'Open Sans', sans-serif;
        }
        .preview {
          margin-top: 20px;
          border-radius: 4px;
          overflow: hidden;
          height: 640px;
        }
      `}
    </style>
  </Frame>
)

export default Preview