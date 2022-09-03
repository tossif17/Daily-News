import React, { Component } from 'react'

export class Newsiteam extends Component {
  
  
    
 render() {
    let {title, description,imageUrl,newsurl,author,date}=this.props;
    
    return (
      <div className='my-3'>
        <div className="card">
    <img src={imageUrl?imageUrl:"https://static.tnn.in/thumb/msid-93869728,imgsize-100,width-1280,height-720,resizemode-75/93869728.jpg"} className="card-img-top" alt="..."/>
    <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p class="card-text"><small class="text-muted">By {author? author:" unknown "} on {new Date(date).toGMTString()}</small></p>
    <a   rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsiteam
