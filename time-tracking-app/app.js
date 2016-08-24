

//-----------------------------------------------------------------------

var TimersDashborad = React.createClass({
    getInitialState: function () {
        return {
            timers: [
                {
                    id:uuid.v4(),
                    title: 'Learn Javascript',
                    project: 'Web Domination',
                    elapsed: '5456099',
                    runningSince:Date.now()
                },
                {
                    id:uuid.v4(),
                    title: 'Learn ReactJS',
                    project: 'Web Domination',
                    elapsed: '12756099',
                    runningSince:Date.now()
                }
               
            ]
        };
    },
    handleCreateFormSubmit: function (timer) {
        this.createTimer(timer);  
    },
    createTimer: function (timer) {
        const t = helpers.newTimer(timer);
        this.setState({timers:this.state.timers.concat(t)});
    },
    render: function () {
        return (
            <div className="ui three column centered grid">
                <div className="column">
                    <EditableTimerList timers={this.state.timers}/>
                    <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
                </div>    
            </div>
        );
    }
});
//-----------------------------------------------------------------------


var EditableTimerList = React.createClass({
    render: function () {
        let timers = this.props.timers.map((timer) => { 
            return (
                <EditableTimer
                    key={timer.id}
                    id={timer.id}
                    title={timer.title}
                    project={timer.project}
                    elapsed={timer.elapsed}
                    runningSince={timer.runningSince}
                />
            );
        });
        return (
            <div id="timers">
                {timers}
            </div>
        );
    }
});

//-----------------------------------------------------------------------

var EditableTimer = React.createClass({
    getInitialState: function () {
        return {
            editFormOpen:false
        };  
    },
    render: function () {
        if (this.state.editFormOpen) {
            return (
                <TimerForm
                    title={this.props.title}
                    project={this.props.project}
                    
                />
            );
        } else {
            return (
                <Timer
                    id={this.props.id}
                    title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runningSince={this.props.runningSince}
                />
            );
        }
    }
});

//-----------------------------------------------------------------------

var TimerForm = React.createClass({
    handleSubmit: function () {
        this.props.onFormSubmit(
            {
                id: this.props.id,
                title: this.refs.title.value,
                project:this.refs.project.value
            }
        );
    },
    render: function () {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className="ui centered card">
                <div className="content">
                    <div className="ui form">
                        <div className="field">
                            <label>Title</label>
                            <input type="text" ref="title" defaultValue={this.props.title}/>
                        </div> 
                        <div className="field">
                            <label>Project</label>
                            <input type="text" ref="project" defaultValue={this.props.project}/>
                        </div> 
                        <div className="ui two bottom attached buttons">
                            <button className="ui basic blue button" onClick={this.handleSubmit}>
                                {submitText} 
                            </button>
                            <button className="ui basic red button">
                                Cancel
                            </button>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
});

//-----------------------------------------------------------------------

var Timer = React.createClass({
    render: function () {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (
            <div className="ui centered card">
              <div className="content">  
                <div className="header">
                    {this.props.title}
                </div> 
                <div className="meta">
                    {this.props.project}
                </div> 
                <div className="center aligned description">
                    <h2>{elapsedString}</h2>
                </div>
                <div className="extra content">
                    <span className="right floated edit icon">
                        <i className="edit icon"></i>
                    </span>     
                </div> 
                <div className="extra content">
                    <span className="right floated trash icon">
                        <i className="trash icon"></i>
                    </span>     
                </div> 
              </div> 
              <div className="ui botton attached blue basic button">
                    Start
              </div>      
            </div>      
        );
    }
});

//-----------------------------------------------------------------------

var ToggleableTimerForm = React.createClass({
    getInitialState: function () {
        return {
            isOpen:false
        };  
    },
    handleFormSubmit: function (timer) {
        this.props.onFormSubmit(timer);
        this.setState({isOpen:false}); 
    },
    handleFormOpen: function () {
        this.setState({isOpen:true});  
    },
    render: function () {
        
        if (this.state.isOpen) {
            return (
                <TimerForm
                    onFormSubmit={this.handleFormSubmit}    
                />
            );
        } else {
            return (
                <div className="ui basic content aligned segment">
                    <button className="ui basic button icon" onClick={this.handleFormOpen}>
                        <i className="plus icon"></i>    
                    </button>    
                </div>  
            );
        }

    }
});

//-----------------------------------------------------------------------



ReactDOM.render(<TimersDashborad />,document.getElementById('root'));