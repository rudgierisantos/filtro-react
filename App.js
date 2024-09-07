import { useEffect, useState } from 'react';


const comboUnidades = [
  { codigo: 1, nome: 'Unidade 1' },
  { codigo: 2, nome: 'Unidade 2' },
  { codigo: 3, nome: 'Unidade 3' },
]

const comboSetores = [
  { codigo: 1, nome: 'Setor 1' },
  { codigo: 2, nome: 'Setor 2' },
  { codigo: 3, nome: 'Setor 3' },
]

const comboCargos = [
  { codigo: 1, nome: 'Cargo 1' },
  { codigo: 2, nome: 'Cargo 2' },
  { codigo: 3, nome: 'Cargo 3' },
]

const hierarquia = {
  unidades: [
    { codigo: 1, setores: [1, 2], cargos: [1, 3] },
    { codigo: 2, setores: [2, 3], cargos: [2, 3] },
    { codigo: 3, setores: [1, 3], cargos: [1, 2] },
  ],
  setores: [
    { codigo: 1, unidades: [1, 3], cargos: [1] },
    { codigo: 2, unidades: [1, 2], cargos: [2, 3] },
    { codigo: 3, unidades: [2, 3], cargos: [1, 2, 3] },
  ],
  cargos: [
    { codigo: 1, unidades: [1, 3], setores: [1, 3] },
    { codigo: 2, unidades: [2, 3], setores: [2, 3] },
    { codigo: 3, unidades: [1, 2], setores: [2, 3] },
  ],
};

function App() {
  const [unidades, setUnidades] = useState(comboUnidades);
  const [setores, setSetores] = useState(comboSetores);
  const [cargos, setCargos] = useState(comboCargos);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [setorSelecionado, setSetorSelecionado] = useState([]);
  const [cargoSelecionado, setCargoSelecionado] = useState(null);

  useEffect(() => {
    if (unidadeSelecionada) {
      const hierarquiaUnidade = hierarquia.unidades.find(u => u.codigo == parseInt(unidadeSelecionada));
      setSetores(comboSetores.filter(s => hierarquiaUnidade.setores.includes(s.codigo)));
      setCargos(comboCargos.filter(c => hierarquiaUnidade.cargos.includes(c.codigo)));
    } else {
      setSetores(setores);
      setCargos(cargos);
    }
  }, [unidadeSelecionada])

  useEffect(() => {
    if (setorSelecionado.length > 0) {
      const setoresSelecionados = hierarquia.setores.filter(s => setorSelecionado.includes(s.codigo));
      
      
      const unidadesFiltradas = comboUnidades.filter(u => setoresSelecionados.every(s => s.unidades.includes(u.codigo)));
      const cargosFiltrados = comboCargos.filter(c => setoresSelecionados.every(s => s.cargos.includes(c.codigo)));
      setUnidades(unidadesFiltradas);
      setCargos(cargosFiltrados);
    }
  }, [setorSelecionado])

  useEffect(() => {
    if (cargoSelecionado) {
      const hierarquiaCargo = hierarquia.cargos.find(u => u.codigo == parseInt(cargoSelecionado));
      setUnidades(comboUnidades.filter(s => hierarquiaCargo.unidades.includes(s.codigo)));
      setSetores(comboSetores.filter(c => hierarquiaCargo.setores.includes(c.codigo)));
    }
  }, [cargoSelecionado]);

  return (
    <div>
      <div>
        <label>Unidade</label>
        <select onChange={(e) => setUnidadeSelecionada(e.target.value)} value={unidadeSelecionada || ''}>
          <option value="">Selecione a unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.codigo} value={unidade.codigo}>
              {unidade.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Setor</label>
        <select multiple onChange={(e) => setSetorSelecionado([...e.target.selectedOptions].map(o => parseInt(o.value)))} value={setorSelecionado || []}>
          {setores.map(setor => (
            <option key={setor.codigo} value={setor.codigo}>
              {setor.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cargo</label>
        <select onChange={(e) => setCargoSelecionado(e.target.value)} value={cargoSelecionado || ''}>
          <option value="">Selecione o cargo</option>
          {cargos.map(cargo => (
            <option key={cargo.codigo} value={cargo.codigo}>
              {cargo.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
