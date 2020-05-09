export default (model) => {
    return `<div id="comcontainer"></div>
            <input id="c1" type="button" value="multiple component 1" />
            <input id="c2" type="button" value="single component 2" />
            ${model.name ?? 'n/a`} ${model.age ?? ''} ${model.sex ?? ''}`;
}