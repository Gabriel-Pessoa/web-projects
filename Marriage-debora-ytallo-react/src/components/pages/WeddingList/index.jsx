import React, { useState, useEffect, useRef } from 'react';

import { RiBankLine } from 'react-icons/ri';
import { FaBarcode, FaHandHoldingHeart } from 'react-icons/fa';
import { BsCreditCard } from 'react-icons/bs';
import { FiGift } from 'react-icons/fi'


import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import weddingList from '../../../data/wedding-list';

import swal from 'sweetalert';

import emailjs from 'emailjs-com';


import './styles.css';


function WeddingList() {

  const [data, setData] = useState(weddingList);

  const [finalValue, setFinalValue] = useState(0);

  const [dataFormBillet, setDataFormBillet] = useState({
    name: '',
    email: '',
    postalCode: '',
    number: '',
    value: ''
  });
  const [dataFormCreditCard, setDataFormCreditCard] = useState({
    name: '',
    email: '',
    postalCode: '',
    number: '',
    value: ''
  });
  const [dataFormFinal, setDataFormFinal] = useState({
    name: '',
    email: '',
    postalCode: '',
    number: '',
    value: ''
  });

  // referências para captura do dom do formulário na função handleSubmit.
  const billetFormRef = useRef();
  const creditCardFormRef = useRef();
  const finalFormRef = useRef();

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

  // variável que soma o total toda a lista.
  let sumFinalPrice = data.map(gift => gift.finalPrice).reduce((acum, curr) => acum + curr, 0);

  // Hook de efeito. Para cada mudança na soma, ele chama a função que seta os estados corretamente.
  useEffect(() => {
    handleFinalPrice(sumFinalPrice);
  }, [sumFinalPrice]);

  // função que trata do setar o preço final no formulário e na tabela com valores válidos.
  function handleFinalPrice(sum) {
    const parse = sum.toFixed(2);
    setDataFormFinal({ ...dataFormFinal, value: parse });

    const parserCurrency = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parse)
    setFinalValue(parserCurrency);
  }

  // função que trata as entrada dos input dos formulários.
  function handleChangeInput(e) {
    const { id, name, value } = e.target;

    // o id do input é quebrado em duas posições, baseado no separador '-', capturando sua primeira posição; para setar o formulário.
    const selectedForm = id.split('-')[0];

    let newValue = value;
    // condição para capturar input de dinheiro.
    if (name === 'value') {
      // convertendo a string recebida pelo MaskedInput em um valor válido para o formulário PagSeguro.
      var re = /\./g;
      const parseValue = value.substring(3).replace(re, '').replace(',', '.');
      newValue = parseValue;
    }

    // realiza alterações em formulário capturado na variável selectedForm, evitando alterar outros formulários.
    switch (selectedForm) {

      case 'formBillet':
        setDataFormBillet({ ...dataFormBillet, [name]: newValue });
        break;

      case 'formCreditCard':
        setDataFormCreditCard({ ...dataFormCreditCard, [name]: newValue });
        break;

      case 'formFinal':
        setDataFormFinal({ ...dataFormFinal, [name]: newValue });
        break;

      default:
        return document.location.reload(true);
    }
  }

  //função que valida todos os campos do formulário
  function validateForm(formDataObject) {
    const { name, email, postalCode, number, value } = formDataObject;

    if (!(name) || name.length < 3) return { result: false, msg: 'NOME' };
    if (!(email) || email.length < 10) return { result: false, msg: 'EMAIL' };
    if (!(postalCode) || postalCode.length < 8 || postalCode.includes('-')) return { result: false, msg: 'CEP (apenas números e 8 dígitos)' };
    if (!number) return { result: false, msg: 'NÚMERO (caso S/N preencha 0)' };
    if (!(value) || value < 1) return { result: false, msg: 'VALOR' };

    return { result: true };
  }

  // função que captura evento de submit do formulário e realiza validação.
  async function handleSubmit(e) {
    e.preventDefault(); // Previne o envio automático do formulário

    const { name } = e.target; //variável que captura nome do formulário para fazer a validação no switch

    let validate = {};
    let currentFormRef;
    let nameUser = '';
    let currentValue = 0;

    switch (name) {
      case 'billetForm':
        currentFormRef = billetFormRef;
        nameUser = dataFormBillet.name;
        currentValue = dataFormBillet.value;

        validate = validateForm(dataFormBillet);

        break;
      case 'creditCardForm':
        currentFormRef = creditCardFormRef;
        nameUser = dataFormCreditCard.name;
        currentValue = dataFormCreditCard.value;

        validate = validateForm(dataFormCreditCard);

        break;
      case 'finalPriceForm':
        currentFormRef = finalFormRef;
        nameUser = dataFormFinal.name;
        currentValue = dataFormFinal.value;

        validate = validateForm(dataFormFinal);

        break;
      default:
        return document.location.reload(true);
    }

    // validação que não permite formulário ser submetido com valores null
    if (!validate.result) {
      //Popup de erro.
      swal({
        title: 'Obrigado pelo seu carinho em nos ajudar, porém...',
        text: `" ${validate.msg} " deve ser preenchido corretamente.`,
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
      timer: 4000,
      button: {
        text: "Redirecionando para pagamento...",
      },
    });

    //template para mensagem de email
    const templateParams = {
      name: nameUser,
      value: currentValue,
    };

    // enviando email 
    await emailjs.send('gmail', 'template_lgyPRYia', templateParams, 'user_XcWFPXd1pJVPqar8bxHE9')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (err) => {
        console.log('FAILED...', err);
      });

    //envia o formulário depois de 4 segundos
    setTimeout(() => {
      currentFormRef.current.submit();
    }, 4000);

  }

  return (
    <div className="wedding-content">

      <h1 className="title-content">Doações e Lista de Presentes </h1>

      <h2 className="subtitle-list-donations"><FaHandHoldingHeart /> <u>Doações livres</u>:</h2>

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
            <p><strong>BOLETO BANCÁRIO (duas opções):</strong></p>

            <ul>

              <li>
                <strong>1º opção - Solicite através de:</strong>

                <p>
                  - WhatsApp:<a href="tel:+55081992167110"> (81) 9.9216-7110 (clique)</a>
                </p>
                <p>
                  - Email: <a href="mailto:casamentoitaloedebora@gmail.com">casamentoitaloedebora@gmail.com </a>
                </p>

              </li>

              <li>
                <strong>2º opção - Diretamente no PagSeguro:</strong>
                <p>-Preencha com os dados do DOADOR:</p>
                <div className="form-free-content">
                  <form>

                    <div>
                      <p>Nome:</p>
                      <input
                        type="text"
                        placeholder="Digite seu nome:"
                        name="name"
                        id="formBillet-name"
                        required
                        value={dataFormBillet.name}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div>
                      <p>Email:</p>
                      <input
                        type="email"
                        placeholder="Digite seu email:"
                        name="email"
                        id="formBillet-email"
                        required
                        value={dataFormBillet.email}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div className="address">

                      <div className="postal-code-content">
                        <p>CEP</p>
                        <input
                          type="text"
                          maxLength="8"
                          placeholder="00000000"
                          name="postalCode"
                          id="formBillet-postalCode"
                          required
                          value={dataFormBillet.postalCode}
                          onChange={handleChangeInput}
                        />
                      </div>

                      <div className="address-number-content">
                        <p className="number">Nº</p>
                        <input
                          type="number"
                          placeholder="Nº"
                          name="number"
                          id="formBillet-number"
                          required
                          value={dataFormBillet.number}
                          onChange={handleChangeInput}
                        />
                      </div>

                    </div>

                    <div>
                      <p>Valor:</p>
                      <MaskedInput
                        mask={numberMask}
                        guide={true}
                        placeholder="Digite o valor R$:"
                        name="value"
                        id="formBillet-value"
                        required
                        onChange={handleChangeInput}
                      />
                    </div>

                  </form>
                </div>

              </li>

            </ul>
            <span className="warning-click">*Clique no botão DOAR abaixo:</span>
            <div className="form-pagseguro-billet">

              <form method="post" name="billetForm" onSubmit={handleSubmit} ref={billetFormRef}
                action="https://pagseguro.uol.com.br/v2/checkout/payment.html" >
                <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                <input name="currency" type="hidden" value="BRL" />

                <input name="itemId1" type="hidden" value="1" />
                <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                <input name="itemAmount1" type="hidden" value={dataFormBillet.value} />
                <input name="itemQuantity1" type="hidden" value="1" />
                <input name="senderEmail" type="hidden" value={dataFormBillet.email} />
                <input name="shippingAddressPostalCode" type="hidden" value={dataFormBillet.postalCode} />
                <input name="shippingAddressNumber" type="hidden" value={dataFormBillet.number} />

                <input alt="Doar com PagSeguro" type="image"
                  src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/120x53-doar.gif" />
              </form>             

            </div>

          </div>

        </div>

        <div className="credit-card-content">
          <i><BsCreditCard size="100px" color="#000" /></i>
          <div className="credit-card-description">
            <div>
              <p><strong>CARTÃO DE CRÉDITO:</strong></p>
              <p>-Preencha com os dados do DOADOR:</p>
              <div className="form-free-content">
                <form>

                  <div>
                    <p>Nome:</p>
                    <input
                      type="text"
                      placeholder="Digite seu nome:"
                      name="name"
                      id="formCreditCard-name"
                      required
                      value={dataFormCreditCard.name}
                      onChange={handleChangeInput}
                    />
                  </div>

                  <div>
                    <p>Email:</p>
                    <input
                      type="email"
                      placeholder="Digite seu email:"
                      name="email"
                      id="formCreditCard-email"
                      required
                      value={dataFormCreditCard.email}
                      onChange={handleChangeInput}
                    />
                  </div>

                  <div className="address">

                    <div className="postal-code-content">
                      <p>CEP</p>
                      <input
                        type="text"
                        maxLength="8"
                        placeholder="00000000"
                        name="postalCode"
                        id="formCreditCard-postalCode"
                        required
                        value={dataFormCreditCard.postalCode}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div className="address-number-content">
                      <p className="number">Nº</p>
                      <input
                        type="number"
                        placeholder="Nº"
                        name="number"
                        id="formCreditCard-number"
                        required
                        value={dataFormCreditCard.number}
                        onChange={handleChangeInput}
                      />
                    </div>

                  </div>

                  <div>
                    <p>Valor:</p>
                    <MaskedInput
                      mask={numberMask}
                      guide={true}
                      placeholder="Digite o valor R$:"
                      name="value"
                      id="formCreditCard-value"
                      required
                      onChange={handleChangeInput}
                    />
                  </div>


                </form>
              </div>

            </div>
            <span className="warning-click">*Clique no botão DOAR abaixo:</span>
            <div className="form-pagseguro">
              <form method="post" name="creditCardForm" onSubmit={handleSubmit} ref={creditCardFormRef}
                action="https://pagseguro.uol.com.br/v2/checkout/payment.html" >
                <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                <input name="currency" type="hidden" value="BRL" />

                <input name="itemId1" type="hidden" value="1" />
                <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                <input name="itemAmount1" type="hidden" value={dataFormCreditCard.value} />
                <input name="itemQuantity1" type="hidden" value="1" />
                <input name="senderEmail" type="hidden" value={dataFormCreditCard.email} />
                <input name="shippingAddressPostalCode" type="hidden" value={dataFormCreditCard.postalCode} />
                <input name="shippingAddressNumber" type="hidden" value={dataFormCreditCard.number} />

                <input alt="Doar com PagSeguro" name="submit" type="image"
                  src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/120x53-doar.gif" />
              </form>
            </div>
          </div>

        </div>

      </div>

      <div className="gifts-list-title">
        <h2><FiGift /> <u>Lista de Presentes</u>:</h2>
        <span>*Escolha o(s) produto(s) abaixo e a quantidade de Cota(s).</span>
      </div>

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
              <td colSpan="6"><strong>Total: </strong>{finalValue}</td>
            </tr>
            <tr>
              <td className="form-cell" colSpan="6">
                <p>-Finalize preenchendo com os dados do DOADOR:</p>
                <div className="form-free-content">
                  <form>
                    <div>
                      <p>Nome:</p>
                      <input
                        type="text"
                        placeholder="Digite seu nome:"
                        name="name"
                        id="formFinal-name"
                        required
                        value={dataFormFinal.name}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div>
                      <p>Email:</p>
                      <input
                        type="email"
                        placeholder="Digite seu email:"
                        name="email"
                        id="formFinal-email"
                        required
                        value={dataFormFinal.email}
                        onChange={handleChangeInput}
                      />
                    </div>

                    <div className="address">
                      <div className="postal-code-content">
                        <p>CEP</p>
                        <input
                          type="text"
                          maxLength="8"
                          placeholder="00000000"
                          name="postalCode"
                          id="formFinal-postalCode"
                          required
                          value={dataFormFinal.postalCode}
                          onChange={handleChangeInput}
                        />
                      </div>

                      <div className="address-number-content">
                        <p className="number">Nº</p>
                        <input
                          type="number"
                          placeholder="Nº"
                          name="number"
                          id="formFinal-number"
                          required
                          value={dataFormFinal.number}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>

                    <div>
                      <p>Total:</p>
                      <input
                        type="text"
                        value={finalValue}
                        readOnly={true}
                      />
                    </div>

                  </form>
                </div>
                <span className="warning-click">*Clique no botão DOAR abaixo:</span>

                <form method="post" name="finalPriceForm" onSubmit={handleSubmit} ref={finalFormRef}
                  action="https://pagseguro.uol.com.br/v2/checkout/payment.html">
                  <input name="receiverEmail" type="hidden" value="ytpessoa@gmail.com" />
                  <input name="currency" type="hidden" value="BRL" />

                  <input name="itemId1" type="hidden" value="1" />
                  <input name="itemDescription1" type="hidden" value="Lista de Casamento" />
                  <input name="itemAmount1" type="hidden" value={dataFormFinal.value} />
                  <input name="itemQuantity1" type="hidden" value="1" />
                  <input name="senderEmail" type="hidden" value={dataFormFinal.email} />
                  <input name="shippingAddressPostalCode" type="hidden" value={dataFormFinal.postalCode} />
                  <input name="shippingAddressNumber" type="hidden" value={dataFormFinal.number} />

                  <input alt="Doar com PagSeguro" type="image"
                    src="https://stc.pagseguro.uol.com.br/public/img/botoes/doacoes/120x53-doar.gif" />
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