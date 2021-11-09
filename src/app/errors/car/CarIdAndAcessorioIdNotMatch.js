class CarIdAndAcessorioIdNotMatch extends Error {
  constructor(Id_car, Id_acessorio) {
    const message = `Acessorio with Id: ${Id_acessorio}, not found in car with Id: ${Id_car}.`;
    super(message);
    this.name = 'Not Found';
  }
}

module.exports = CarIdAndAcessorioIdNotMatch;
