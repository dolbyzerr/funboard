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
        return {imageURL: "", loading: false};
    },
    componentWillMount: function(){
        socket.on('image:change', this.preloadImage);
    },
    changeImage: function(img){
        this.setState({imageURL: img, loading: false});
    },
    preloadImage: function(src){
        this.setState({loading: true});
        var img = new Image();
        img.onload = function(){
            this.changeImage(src);
        }.bind(this);
        img.src = src;
    },
    onDragLeave: function(evt){
        this.setState({dragenter: false});
        evt.preventDefault();
    },
    onDragOver: function(evt){
        if(this.state.dragenter !== true){
            this.setState({dragenter: true});
        }
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
            'funboard_dragenter': this.state.dragenter,
            'funboard_loading': this.state.loading
        });
        return (
            <div className={classes} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop} >
                <ImageView src={this.state.imageURL} />
                <div className="spinner">
                  <div className="rect1"></div>
                  <div className="rect2"></div>
                  <div className="rect3"></div>
                  <div className="rect4"></div>
                  <div className="rect5"></div>
                </div>
            </div>
        );
    }
});


React.renderComponent(
  <FunBoard />,
  document.body
);