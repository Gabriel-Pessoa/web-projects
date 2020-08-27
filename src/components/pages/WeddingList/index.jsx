import React, { useState, useEffect, useRef } from 'react';

import { RiBankLine } from 'react-icons/ri';
import { FaBarcode } from 'react-icons/fa';
import { BsCreditCard } from 'react-icons/bs';

import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import weddingList from '../../../data/wedding-list';

import swal from 'sweetalert';

import './styles.css';


function WeddingList() {

  const [data, setData] = useState([]);

  // carrega dados apenas uma vez, setando a variável data
  useEffect(() => {
    setData([...weddingList]);
  }, []);

  const [valuePagSeguro, setValuePagSeguro] = useState({
    billetValue: '0',
    creditCardValue: '0'
  });

  // nomes do usuário a depender do formulário
  const [billetName, setBilletName] = useState('');
  const [creditCardName, setCreditCardName] = useState('');
  const [finalName, setFinalName] = useState('');

  // referências para captura do dom do formulário na função handleSubmit.
  const billetRef = useRef();
  const creditCardRef = useRef();
  const finalPriceRef = useRef();


  // configurações do input do valor da doação
  const numberMask = createNumberMask({
    prefix: 'R$ ',
    suffix: '00',
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
    allowLeadingZeroes: false,
    requireDecimal: true,
    integerLimit: 7,
    allowDecimal: true,
    includeThousandsSeparator: true

  })

  // função que calcula e seta cotas escolhidas pelo usuário
  function handleQuota(id, value) {
    const index = id - 1; //array inicia na posição 0
    if (value >= 0 && value <= data[index].qtdQuota) {
      const finalPrice = parseFloat((data[index].fullAmount / data[index].qtdQuota) * value);
      const updateWeddingList = data.map(gift => {
        return gift.id === id ? { ...gift, quota: value, finalPrice } : gift
      });
      setData(updateWeddingList);
    }
  }

  // função que calcula o valor final de itens selecionados
  function finalPrice() {
    let price = 0;
    for (let i = 0; i < data.length; i++) {
      price += (data[i].finalPrice);
    }
    return parseFloat(price);
  }

  // função que trata as entrada dos input de entrada de valores.
  function handleChangeInput(e) {
    const { name, value } = e.target;

    var re = /\./g;
    const parseValue = value.substring(3).replace(re, '').replace(',', '.');

    setValuePagSeguro({ ...valuePagSeguro, [name]: String(parseValue) });
  }


  // função que captura evento de submit do formulário
  function handleSubmit(e) {
    e.preventDefault(); // Previne o envio automático do formulário

    const { name } = e.target; //variável que captura nome do formulário para fazer a validação no switch

    let validate = true;
    let nameUser = '';
    let currentForm;

    switch (name) {
      case 'billetForm':
        currentForm = billetRef;
        nameUser = billetName;

        if (billetName.length < 2 || (!(parseFloat(valuePagSeguro.billetValue)))) {
          validate = false;
        }

        break;
      case 'creditCardForm':
        currentForm = creditCardRef;
        nameUser = creditCardName;

        if (creditCardName.length < 2 || (!(parseFloat(valuePagSeguro.creditCardValue)))) {
          validate = false;
        }

        break;

      case 'finalPriceForm':
        currentForm = finalPriceRef;
        nameUser = finalName;

        if (finalName.length < 2 || (!(finalPrice()))) {
          validate = false;
        }

        break;

      default:
        return document.location.reload(true);
    }

    // validação que não permite formulário ser submetido sem valor
    if (!validate) {
      //Popup de erro.
      swal({
        title: 'Obrigado pelo seu carinho em nos ajudar, porém...',
        text: `"NOME" e "VALOR" devem ser preenchidos corretamente. Após, clique no botão verde "DOAR"!`,
        icon: 'error',
        dangerMode: true,
      });
      return; // sai da função impedindo executar os códigos abaixo.
    }

    // Popup de sucesso!
    swal({
      title: `${nameUser.toUpperCase()}`,
      text: 'Obrigado pelo sua carinho em nos ajudar!',      
      icon: "success",
      timer: 7000,
      //button: false,
      button: {
        text: "Redirecionando para Página de Doação...",        
      },
      
      //dangerMode: false,
    });

    // envia o formulário depois de 7 segundos
    setTimeout(() => {
      currentForm.current.submit();
    }, 7000);

  }

  //convertendo valor final da lista do presente para ser submetido ao formulário pagSeguro
  var re = /\./g;
  let parseString = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
    .format(finalPrice()).replace(re, '').replace(',', '.').substring(3);

  return (
    <div className="wedding-content">

      <h1 className="title-content">Doações e Lista de Presentes </h1>

      <h2>Doações livres:</h2>

      <div className="payments-content">

        <div className="transfer-content">
          <i><RiBankLine size="100px" color="#000" /></i>
          <ul>
            <p><strong>TRANSFERÊNCIA BANCÁRIA</strong></p>
            <p><strong>Agência:</strong> 3250-6</p>
            <p><strong>C/C:</strong> 17796-2</p>
            <p><strong>Nome:</strong> Ytallo Gustavo Brito Pessoa</p>
            <p><strong>CPF:</strong> 079.418.234-89</p>
            <p><strong>Banco:</strong> Banco Do Brasil</p>
          </ul>
        </div>

        <div className="billet-content">
          <i><FaBarcode size="100px" color="#000" /></i>

          <div className="billet-description">
            <ul>
              <p><strong>BOLETO BANCÁRIO (duas opções):</strong></p>

              <li>
                <strong>1º opção - através de:</strong>
                <ul>
                  <li>
                  WhatsApp:<a href="tel:+55081992167110">(81) 9.9216-7110 (clique)</a>  </li>
                  <li>
                  Email:  <a href="mailto:casamentoitaloedebora@gmail.com"> casamentoitaloedebora@gmail.com </a>
                  </li>
                </ul>
              </li>

              <li>
                <strong>2º opção</strong>
                <span> - Digite NOME e VALOR e 
                  clique no botão DOAR abaixo:</span>
                <div className="form-free-content">
                  <form>

                    <fieldset>
                      <p>Nome:</p>
                      <input
                        type="text"
                        placeholder="Digite seu nome:"
                        value={billetName}
                        onChange={(e) => setBilletName(e.target.value)}
                      />

                    </fieldset>

                    <fieldset>
                      <p>Valor:</p>
                      <MaskedInput
                        mask={numberMask}
                        guide={true}
                        name="billetValue"
                        id="billetValue"
                        onChange={handleChangeInput}
                        placeholder="Digite o valor R$:"
                      />

                    </fieldset>

                  </form>
                </div>

              </li>
            </ul>

            <div className="form-pagseguro">

              <form method="post" name="billetForm" target="pagseguro" onSubmit={handleSubmit} ref={billetRef}
                action="https://pagseguro.uol.com.br/v2/checkout/payment.html" >
                <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                <input name="currency" type="hidden" value="BRL" />

                <input name="itemId1" type="hidden" value="1" />
                <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                <input name="itemAmount1" type="hidden" value={valuePagSeguro.billetValue} />
                <input name="itemQuantity1" type="hidden" value="1" />
                <input name="senderEmail" type="hidden" value="casamentoitaloedebora@gmail.com" />

                <input alt="Doar com PagSeguro" type="image"
                  src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/120x53-doar.gif" />
              </form>
        
            </div>

          </div>

        </div>

        <div className="credit-card-content">
          <i><BsCreditCard size="100px" color="#000" /></i>
          <div className="credit-card-description">
            <ul>
              <p><strong>CARTÃO DE CRÉDITO:</strong></p>
              <span> Digite NOME e VALOR e clique no botão DOAR abaixo:</span>
              <div className="form-free-content">
                <form>

                  <fieldset>
                    <p>Nome:</p>
                    <input
                      type="text"
                      placeholder="Digite seu nome:"
                      value={creditCardName}
                      onChange={(e) => setCreditCardName(e.target.value)}
                    />

                  </fieldset>

                  <fieldset>
                    <p>Valor:</p>
                    <MaskedInput
                      mask={numberMask}
                      guide={true}
                      name="creditCardValue"
                      id="creditCardValue"
                      onChange={handleChangeInput}
                      placeholder="Digite o valor R$:"
                    />
                  </fieldset>

                </form>
              </div>

            </ul>
            <div>
              <form method="post" name="creditCardForm" target="pagseguro" onSubmit={handleSubmit} ref={creditCardRef}
                action="https://pagseguro.uol.com.br/v2/checkout/payment.html" >
                <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                <input name="currency" type="hidden" value="BRL" />

                <input name="itemId1" type="hidden" value="1" />
                <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                <input name="itemAmount1" type="hidden" value={valuePagSeguro.creditCardValue} />
                <input name="itemQuantity1" type="hidden" value="1" />
                <input name="senderEmail" type="hidden" value="casamentoitaloedebora@gmail.com" />

                <input alt="Doar com PagSeguro" name="submit" type="image"
                  src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/120x53-doar.gif" />
              </form>
            </div>
          </div>

        </div>

      </div>

      <h2 className="gifts-list-title">Lista de Presentes</h2>

      <div className="wedding-list">
        <table>
          <thead>
            <tr>
              <th className="text-align-center">Imagem</th>
              <th>Nome</th>
              <th>Valor Integral</th>
              <th>Qtd Cotas</th>
              <th>Cotas</th>
              <th>Valor da Doação</th>
            </tr>
          </thead>
          <tbody>

            {data.map(gift => (

              <tr key={gift.id}>
                <td className="table-img"><img src={gift.image_url} alt={gift.name} /></td>
                <td>{gift.name}</td>
                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.fullAmount)}</td>
                <td>{gift.qtdQuota} de {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.fullAmount / gift.qtdQuota)}</td>
                <td className="buttons-quota">
                  <button name="increment" id="increment" onClick={() => handleQuota(gift.id, gift.quota + 1)}>
                    +
                  </button>
                  <br />
                  {gift.quota}
                  <br />
                  <button name="decrement" id="decrement" onClick={() => handleQuota(gift.id, gift.quota - 1)}>
                    -
                  </button>
                </td>
                <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(gift.finalPrice)}</td>
              </tr>

            ))}

          </tbody>
          <tfoot>
            <tr>
              <td colSpan="6"><strong>Total: </strong>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(finalPrice())}</td>
            </tr>
            <tr>
              <td colSpan="6">
                <p>*Digite seu nome e clique no botão pagar abaixo:</p>
                <input
                  className="input-final-price"
                  type="text"
                  placeholder="Digite seu nome:"
                  onChange={(e) => setFinalName(e.target.value)}
                  value={finalName}
                />
                <form method="post" name="finalPriceForm" target="pagseguro" onSubmit={handleSubmit} ref={finalPriceRef}
                  action="https://pagseguro.uol.com.br/v2/checkout/payment.html">
                  <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                  <input name="currency" type="hidden" value="BRL" />

                  <input name="itemId1" type="hidden" value="1" />
                  <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                  <input name="itemAmount1" type="hidden" value={`${parseString}`} />
                  <input name="itemQuantity1" type="hidden" value="1" />
                  <input name="senderEmail" type="hidden" value="casamentoitaloedebora@gmail.com" />

                  <input alt="Pague com PagSeguro" name="submit" type="image"
                    src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/pagamentos/120x53-pagar.gif" />
                </form>

                <div className="warning">
                  <span>* Lembrando que dependemos de plataformas de terceiros para pagamentos, e pode vir à ocorrer de saírem do ar.</span>
                  <span>* Se isso acontecer, por favor tente novamente mais tarde. Agradecemos a compreensão.</span>
                </div>

              </td>
            </tr>
          </tfoot>
        </table>

      </div>

    </div>
  );
}

export default WeddingList;