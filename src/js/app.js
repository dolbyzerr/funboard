/** @jsx React.DOM */

var socket = io( window.location.host );
var React = require('react/addons');

socket.on('connect', function(){
    socket.on('disconnect', function(){

    });
});

var ImageView = React.createClass({
    render: function(){
        var divStyle = {
            "backgroundImage": "url('" + this.props.src + "')"
        };
        return (
            <div className="image" style={divStyle}>
                <img src={this.props.src} />
            </div>
        );
    }
});

var FunBoard = React.createClass({
    getInitialState: function(){
        return {imageURL: ""};
    },
    componentWillMount: function(){
        socket.on('image:change', this.changeImage);
    },
    changeImage: function(img){
        this.setState({imageURL: img});
    },
    onDragLeave: function(evt){
        this.setState({dragenter: false});
        evt.preventDefault();
    },
    onDragOver: function(evt){
        this.setState({dragenter: true});
        evt.preventDefault();
    },
    onDrop: function(evt){
        evt.preventDefault();

        var files = evt.nativeEvent.dataTransfer.files;
        var reader;
        for(var i=0; i!=files.length; i++){
            reader = new FileReader();
            reader.onload = (function(file){
                return function(e){
                    socket.emit('image:upload', {name: file.name}, reader.result);
                }
            })(files[i]);
            reader.readAsBinaryString(files[i]);
        }
        this.setState({dragenter: false});
    },
    render: function(){
        var cx = React.addons.classSet;
        var classes = cx({
            'funboard': true,
            'funboard_dragenter': this.state.dragenter
        });
        return (
            <div className={classes} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop} >
                <ImageView src={this.state.imageURL} />
            </div>
        );
    }
});


React.renderComponent(
  <FunBoard />,
  document.body
);