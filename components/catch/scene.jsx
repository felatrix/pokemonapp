/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import Image from '../base/image';
import Button from '../base/button';
import Input from '../base/input';
import ValidationTip from './validationTip';
import { MdCatchingPokemon } from 'react-icons/md';

import { useAppContext } from '../../contexts/AppContext';

const CatchScene = ({
  currentPokemon,
  isCatch,
  backToCatch,
  backToCollection,
}) => {
  const bounceAnimation = keyframes`0%   { transform: translateY(0); }
  20%  { transform: translateY(-50px); }
  40%  { transform: translateY(-100px); }
  60%  { transform: translateY(-150px); }
  80%  { transform: translateY(-180px); }
  100% { transform: translateY(-190px); }`;

  const { state, dispatch } = useAppContext();

  const [delayBall, setDelayBall] = useState(false);
  const [nickName, setNickName] = useState('');
  const [showValidationTip, setShowValidationTip] = useState(false);
  const [validation, setValidation] = useState({
    maxChar: false,
    minChar: false,
    noSpace: false,
  });
  const [sameNickName, setSameNickName] = useState(false);
  useEffect(() => {
    setDelayBall(false);
    setShowValidationTip(false);
    setValidation({
      maxChar: false,
      minChar: false,
      noSpace: false,
    });
    setTimeout(() => {
      setDelayBall(true);
    }, 2000);
  }, []);

  useEffect(() => {
    setValidation((prevState) => {
      return {
        ...prevState,
        minChar: nickName.length >= 4,
        maxChar: nickName.length <= 8,
        noSpace: !/\s/.test(nickName),
      };
    });
  }, [nickName]);

  const setNickNameHandler = () => {
    const searchByName = state.pokemon.filter(
      (item) => item.name === currentPokemon.name
    );
    const searchByNickName = searchByName.filter(
      (item) => item.nickName === nickName
    );
    const currentCopy = { ...currentPokemon, nickName: nickName };

    if (searchByNickName.length === 0) {
      setSameNickName(false);
      dispatch({ type: 'ADD_POKEMON', pokemon: currentCopy });
      backToCollection();
    } else {
      setSameNickName(true);
    }
  };

  return (
    <div
      css={{
        width: '101vw',
        height: '100vh',
        backgroundColor: 'white',
        position: 'fixed',
        top: '0',
        left: '-8px',
        zIndex: '20',
        background: '#f0f8ffdb',
      }}
    >
      <div
        css={{
          maxWidth: '560px',
          margin: 'auto',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '70px 15px',
          backgroundColor: 'white',
        }}
      >
        <div
          css={{
            height: '340px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!delayBall ? (
            <>
              <Image
                url={currentPokemon?.sprites.front_default}
                styleCss={{ width: '250px' }}
              />
              <div
                css={{
                  animation: `${bounceAnimation} 2s ease`,
                  animationIterationCount: 1,
                }}
              >
                <MdCatchingPokemon
                  size={250}
                  color="#882D17"
                  style={{
                    width: '100px',
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {isCatch ? (
                <>
                  {sameNickName ? (
                    <h5>
                      You have a collection with same nickname use other !!
                    </h5>
                  ) : (
                    <h5>You did it !! Check your collections</h5>
                  )}
                  <Image
                    url={currentPokemon?.sprites.front_default}
                    styleCss={{ height: '250px' }}
                  />
                  <p>{currentPokemon?.name}</p>
                </>
              ) : (
                <h5>Sorry Mate You failed , try again later</h5>
              )}
            </>
          )}
        </div>
        {delayBall ? (
          <>
            {!isCatch ? (
              <Button
                text={'Try Again :)'}
                onClick={() => backToCatch()}
              ></Button>
            ) : (
              <>
                <div
                  css={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '280px',
                  }}
                >
                  <h5
                    css={{
                      margin: '10px 0',
                      selfAlign: 'left',
                    }}
                  >
                    Give your catch a nickname
                  </h5>
                  <div
                    css={{
                      width: '100%',
                    }}
                  >
                    <ValidationTip show={showValidationTip} data={validation} />
                    <Input
                      value={nickName}
                      onChange={(value) => setNickName(value)}
                      onKeyUp={() => setShowValidationTip(true)}
                      onKeyDown={() => setShowValidationTip(false)}
                      style={{
                        marginBottom: '10px',
                        width: '100%',
                        '&::focus + div': css({
                          visibility: 'visible',
                          opacity: 1,
                        }),
                      }}
                    />
                  </div>

                  {validation.maxChar &&
                  validation.minChar &&
                  validation.noSpace ? (
                    <Button
                      text={'Save and Take a Look Your Collection'}
                      onClick={() => setNickNameHandler()}
                      style={{
                        width: '100% !important',
                      }}
                    ></Button>
                  ) : (
                    ''
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default CatchScene;
