import { Component } from "react"
import React from "react"
import axios from "axios"
import dynamic from "next/dynamic"

const DropzoneWithNoSSR = dynamic(() => import("react-dropzone"), {
  ssr: false
})

class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SLIDE_LIST: []
    }
  }

  handleOnDropAccepted = acceptedFiles => {
    const formData = new FormData()
    formData.append('data', acceptedFiles[acceptedFiles.length - 1])
    axios.post('/api/slide/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    this.setState({
      SLIDE_LIST: [
        ...this.state.SLIDE_LIST,
        {
          type: 'photo',
          data: acceptedFiles[acceptedFiles.length - 1].name,
          title: '',
          desc: '',
          duration: 3,
          order: this.state.SLIDE_LIST.length + 1
        }
      ]
    })
    //eslint-disable-next-line
    console.log(this.state.SLIDE_LIST)
  }

  handleOnDropRejected = rejectedFiles => {
    alert('This file type is not allowed:' + rejectedFiles[rejectedFiles.length - 1].name)
  }

  render() {
    return (
      <div>
        <DropzoneWithNoSSR
          accept="image/*"
          onDropAccepted={this.handleOnDropAccepted}
          onDropRejected={this.handleOnDropRejected}
        >
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div {...getRootProps()} className='upload'>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Click or drop files here to add to the slideshow</p>
                ) : (
                  <p>Drop files here to add to the slideshow </p>
                )}
              </div>
            )
          }}
        </DropzoneWithNoSSR>
        <div className='list'>
          {this.state.SLIDE_LIST.map(item => (
            <div className='element'>{item.data}</div>
          ))}
        </div>

        <style jsx>
          {`
            .upload {
              padding: 20px;
              font-family: "Open Sans", sans-serif;
              text-align: center;
              border-radius: 4px;
              border: 2px dashed #adadad;
              cursor: pointer;
              background: white;
              border: 1px black dashed;
            }
          `}
        </style>
      </div>
    )
  }
}

export default Upload
