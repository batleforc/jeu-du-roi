import React from 'react';

export default class CreatePerso extends React.Component{
    constructor(props){
        super(props)
        this.state={
            MaxPointStat:20,
            PointStat:0,
            MaxPointPerStat:20,
            Name:"",
            Surname:"",
            Gender:0,
            Agi:0,
            Str:0,
            Vit:5,
            Intel:0,
            Perce:0,
            Status:"",
        }
        props.connection.on("MaxPointStat",data=>{this.setState({"MaxPointStat":data})})
        props.connection.on("MaxPerStat",data=>{this.setState({"MaxPointPerStat":data})})
        props.connection.on("Error",(data,data2)=>{this.setState({Status:data+":"+data2})})
        this.handleSelectChange=this.handleSelectChange.bind(this);
        this.handleStatChange=this.handleStatChange.bind(this);
        this.handleCreatePerso=this.handleCreatePerso.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
    }
    handleSelectChange(event) {
        this.setState({Gender: event.target.value});
      }
    handleStatChange(event){ 
        const Name = event.target.name;
        const value= Number(event.target.value);
        const oldvalue= Number(this.state[Name])
        var PointStat =this.state.Agi+this.state.Str+this.state.Vit-5+this.state.Intel+this.state.Perce-oldvalue+value
        if(PointStat>this.state.MaxPointStat) return;
        console.log(PointStat)
        this.setState({[Name]:Number(value),"PointStat":Number(PointStat)})
    }
    handleTextChange(event){
        const Name = event.target.name;
        const value= event.target.value;
        this.setState({[Name]:value})
    }
    handleCreatePerso(){
        if(this.state.PointStat===this.state.MaxPointStat)
            this.props.connection.invoke('InitJoueur',this.state.Agi,this.state.Str,this.state.Vit,this.state.Intel,this.state.Perce,this.state.Name,this.state.Surname,Number(this.state.Gender))
        else
            this.setState({"Status":"Veuillez attribuer toute les stat"})
    }

    componentDidMount(){

    }

    render(){
        return(
            <div className="CreaForm">
                <h1 className="FormH1">Interface de création de perso</h1>
                {this.state.Status!==""&&<h2 style={{color:"red",textAlign:"center"}}>{this.state.Status}</h2>}
                <form className="FormCreaForm">
                    <label className="FormLabel">
                    Nom : (Champ temporaire)
                      <input className="FormText FormSurname" type="text" name="Surname" required onChange={this.handleTextChange} value={this.state.Surname} />
                    </label>
                    <label className="FormLabel">
                      Prénom :
                    <input className="FormName FormText" type="text" name="Name" required onChange={this.handleTextChange} value={this.state.Name} />
                    </label>
                    <div>
                    <select className="FormSelect FormGender" value={this.state.value} onChange={this.handleSelectChange} required defaultValue="">
                        <option value="" disabled hidden> Choisisez votre genre</option>
                        <option value="0">Non préciser</option>
                        <option value="1">Femme</option>
                        <option value="2">Homme</option>
                        <option value="3">Other</option>
                    </select>
                    </div>
                    <fieldset className="FormFieldset">
                        <legend className="FormFLegend" >Stat dispo : {this.state.MaxPointStat-this.state.PointStat}</legend>
                        <label className="FormLabel" >
                        Agi
                        <input className="FormAgi FormStat" type="number" name="Agi" min="0" max={this.state.MaxPointPerStat} required value={this.state.Agi} onChange={this.handleStatChange}/></label>
                        <label className="FormLabel">
                        Str
                        <input  className="FormStr FormStat" type="number" name="Str" min="0" max={this.state.MaxPointPerStat} required value={this.state.Str} onChange={this.handleStatChange} /></label>
                        <label className="FormLabel">
                        Vit
                        <input  className="FormVit FormStat" type="number" name="Vit" min="5" max={this.state.MaxPointPerStat} required value={this.state.Vit} onChange={this.handleStatChange} /></label>
                        <label className="FormLabel">
                        Intel
                        <input  className="FormIntel FormStat" type="number" name="Intel" min="0" max={this.state.MaxPointPerStat}  required value={this.state.Intel} onChange={this.handleStatChange} /></label>
                        <label className="FormLabel">
                        Perce
                        <input  className="FormPerce FormStat" type="number" name="Perce" min="0" max={this.state.MaxPointPerStat} required value={this.state.Perce} onChange={this.handleStatChange} /></label>
                    </fieldset>
                    
                </form>
                <button className="FormButton" onClick={this.handleCreatePerso}> Creer son perso</button>
                {this.props.debug&&<button className="FormButton" onClick={this.props.handle}>Simuler un perso creer</button>}
            </div>
        )
    }
}