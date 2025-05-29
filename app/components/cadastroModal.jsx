"use client";

import { useState, useEffect } from 'react';
import { SUPABASE_URL, supabaseHeaders } from '../../lib/supabase';

export default function CadastroModal({ onSave }) {
  const [form, setForm] = useState({});
  const [redes, setRedes] = useState([]);
  const [cepError, setCepError] = useState('');

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/RedeMinisteriais?select=*`, { headers: supabaseHeaders })
      .then(res => res.json())
      .then(data => {
        const redesOrdenadas = data.sort((a, b) => a.id - b.id);
        setRedes(redesOrdenadas);
      });
  }, []);

  const handleChange = e => {
    const { id, value } = e.target;

    // Máscara de telefone
    if (id === 'contatoAnfitriao' || id === 'contatoLider') {
      const num = value.replace(/\D/g, '').slice(0, 11);
      let formatted = num;

      if (num.length > 2) {
        formatted = `(${num.slice(0, 2)}) ${num.slice(2)}`;
      }
      if (num.length >= 7) {
        formatted = `(${num.slice(0, 2)}) ${num.slice(2, 7)}-${num.slice(7)}`;
      }

      setForm({ ...form, [id]: formatted });
      return;
    }

    // Máscara de CEP
    if (id === 'cep') {
      const num = value.replace(/\D/g, '').slice(0, 8);
      const formatted = num.length > 5 ? `${num.slice(0, 5)}-${num.slice(5)}` : num;
      setForm({ ...form, [id]: formatted });
      setCepError('');

      if (num.length === 8) {
        consultarCEP(num);
      }

      return;
    }

    // Padrão
    setForm({ ...form, [id]: value });
  };

  const consultarCEP = (cepLimpo) => {
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          setCepError('CEP não encontrado.');
        } else {
          setForm(prev => ({
            ...prev,
            logradouro: data.logradouro || '',
            complemento: data.complemento || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            uf: data.uf || ''
          }));
          setCepError('');
        }
      })
      .catch(() => setCepError('Erro ao consultar CEP.'));
  };

  const salvar = () => {
    fetch(`${SUPABASE_URL}/rest/v1/CelulaEdificar`, {
      method: 'POST',
      headers: { ...supabaseHeaders, 'Prefer': 'return=representation' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          onSave();
          alert('Célula salva com sucesso!');
        } else {
          alert('Erro ao salvar.');
        }
      });
  };

  const limpar = () => {
    setForm({});
    setCepError('');
    const formElement = document.getElementById('formCelula');
    if (formElement) formElement.reset();
  };

  return (
    <div className="modal fade" id="modalCadastro" tabIndex="-1" aria-labelledby="modalCadastroLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCadastroLabel">Cadastro de Célula</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>
          <div className="modal-body">
            <form id="formCelula">
              <div className="mb-3">
                <label htmlFor="redeMinisterial" className="form-label">Rede Ministerial</label>
                <select className="form-select" id="id_rede" onChange={handleChange} value={form.id_rede || ''}>
                  <option value="">Selecione</option>
                  {redes.map(r => (
                    <option key={r.id} value={r.id}>{r.descricao}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="nomeCelula" className="form-label">Nome da Célula</label>
                <input type="text" className="form-control" id="nomeCelula" onChange={handleChange} value={form.nomeCelula || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="descricaoCelula" className="form-label">Descrição da Célula</label>
                <textarea className="form-control" id="descricaoCelula" onChange={handleChange} value={form.descricaoCelula || ''}></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="nomeAnfitriao" className="form-label">Nome do Anfitrião</label>
                <input type="text" className="form-control" id="nomeAnfitriao" onChange={handleChange} value={form.nomeAnfitriao || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="contatoAnfitriao" className="form-label">Contato do Anfitrião</label>
                <input type="tel" className="form-control" id="contatoAnfitriao" placeholder="(00) 00000-0000" onChange={handleChange} value={form.contatoAnfitriao || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="nomeLider" className="form-label">Nome do Líder Responsável</label>
                <input type="text" className="form-control" id="nomeLider" onChange={handleChange} value={form.nomeLider || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="contatoLider" className="form-label">Contato do Líder Responsável</label>
                <input type="tel" className="form-control" id="contatoLider" placeholder="(00) 00000-0000" onChange={handleChange} value={form.contatoLider || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="horarioCelula" className="form-label">Horário</label>
                <input type="time" className="form-control" id="horarioCelula" onChange={handleChange} value={form.horarioCelula || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="diaCelula" className="form-label">Dia da Semana</label>
                <select className="form-select" id="diaCelula" onChange={handleChange} value={form.diaCelula || ''}>
                  <option value="Segunda-feira">Segunda-feira</option>
                  <option value="Terça-feira">Terça-feira</option>
                  <option value="Quarta-feira">Quarta-feira</option>
                  <option value="Quinta-feira">Quinta-feira</option>
                  <option value="Sexta-feira">Sexta-feira</option>
                  <option value="Sábado">Sábado</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="cep" className="form-label">CEP</label>
                <input type="text" className="form-control" id="cep" placeholder="00000-000" onChange={handleChange} value={form.cep || ''} />
                {cepError && <div className="text-danger mt-1">{cepError}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="logradouro" className="form-label">Logradouro</label>
                <input type="text" className="form-control" id="logradouro" onChange={handleChange} value={form.logradouro || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="numero" className="form-label">Número</label>
                <input type="text" className="form-control" id="numero" onChange={handleChange} value={form.numero || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="complemento" className="form-label">Complemento</label>
                <input type="text" className="form-control" id="complemento" onChange={handleChange} value={form.complemento || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="bairro" className="form-label">Bairro</label>
                <input type="text" className="form-control" id="bairro" onChange={handleChange} value={form.bairro || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="cidade" className="form-label">Cidade</label>
                <input type="text" className="form-control" id="cidade" onChange={handleChange} value={form.cidade || ''} />
              </div>

              <div className="mb-3">
                <label htmlFor="uf" className="form-label">UF</label>
                <input type="text" className="form-control" id="uf" maxLength="2" onChange={handleChange} value={form.uf || ''} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={salvar}>Salvar</button>
            <button type="button" className="btn btn-secondary" onClick={limpar}>Limpar</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
