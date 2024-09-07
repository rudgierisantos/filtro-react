import { useEffect, useState } from 'react';

const dados = {
  unidades: [
    { id: 1, nome: 'Unidade 1', setores: [1, 2], cargos: [1, 3] },
    { id: 2, nome: 'Unidade 2', setores: [2, 3], cargos: [2, 3] },
    { id: 3, nome: 'Unidade 3', setores: [1, 3], cargos: [1, 2] },
  ],
  setores: [
    { id: 1, nome: 'Setor 1', unidades: [1, 3], cargos: [1] },
    { id: 2, nome: 'Setor 2', unidades: [1, 2], cargos: [2, 3] },
    { id: 3, nome: 'Setor 3', unidades: [2, 3], cargos: [1, 2, 3] },
  ],
  cargos: [
    { id: 1, nome: 'Cargo 1', unidades: [1, 3], setores: [1, 3] },
    { id: 2, nome: 'Cargo 2', unidades: [2, 3], setores: [2, 3] },
    { id: 3, nome: 'Cargo 3', unidades: [1, 2], setores: [2, 3] },
  ],
};

function App() {
  const [unidades, setUnidades] = useState(dados.unidades);
  const [setores, setSetores] = useState(dados.setores);
  const [cargos, setCargos] = useState(dados.cargos);

  const [unidadeSelecionada, setUnidadeSelecionada] = useState(null);
  const [setorSelecionado, setSetorSelecionado] = useState([]);
  const [cargoSelecionado, setCargoSelecionado] = useState(null);

  useEffect(() => {
    if (unidadeSelecionada) {
      const unidade = dados.unidades.find(u => u.id == parseInt(unidadeSelecionada));
      setSetores(dados.setores.filter(s => unidade.setores.includes(s.id)));
      setCargos(dados.cargos.filter(c => unidade.cargos.includes(c.id)));
    } else {
      setSetores(dados.setores);
      setCargos(dados.cargos);
    }
  }, [unidadeSelecionada])

  useEffect(() => {
    debugger;
    if (setorSelecionado.length > 0) {
      const setoresSelecionados = dados.setores.filter(s => setorSelecionado.includes(s.id));
      const unidadesFiltradas = dados.unidades.filter(u => setoresSelecionados.every(s => s.unidades.includes(u.id)));
      const cargosFiltrados = dados.cargos.filter(c => setoresSelecionados.every(s => s.cargos.includes(c.id)));
      setUnidades(unidadesFiltradas);
      setCargos(cargosFiltrados);
    }
  }, [setorSelecionado])

  useEffect(() => {
    if (cargoSelecionado) {
      const cargo = dados.cargos.find(c => c.id === parseInt(cargoSelecionado));
      setUnidades(dados.unidades.filter(u => cargo.unidades.includes(u.id)));
      setSetores(dados.setores.filter(s => cargo.setores.includes(s.id)));
    }
  }, [cargoSelecionado]);

  return (
    <div>
      <div>
        <label>Unidade</label>
        <select onChange={(e) => setUnidadeSelecionada(e.target.value)} value={unidadeSelecionada || ''}>
          <option value="">Selecione a unidade</option>
          {unidades.map(unidade => (
            <option key={unidade.id} value={unidade.id}>
              {unidade.nome}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Setor</label>
        <select multiple onChange={(e) => setSetorSelecionado([...e.target.selectedOptions].map(o => parseInt(o.value)))} value={setorSelecionado || []}>
          {setores.map(setor => (
            <option key={setor.id} value={setor.id}>
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
            <option key={cargo.id} value={cargo.id}>
              {cargo.nome}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;
