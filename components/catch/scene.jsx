/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line no-unused-vars
import { css, keyframes } from '@emotion/react';

import Image from '../base/image';
import Button from '../base/button';
import Input from '../base/input';

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
  100% { transform: translateY(-210px); }`;

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

  const tooltipText = {
    fontSize: '10px',
  };

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
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        position: 'fixed',
        top: '0',
        left: '-8px',
        zIndex: '20',
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
                url={currentPokemon?.image}
                styleCss={{ width: '250px' }}
              />
              <Image
                url={'./images/pokeball.gif'}
                styleCss={{
                  width: '350px',
                  animation: `${bounceAnimation} 2s ease`,
                  animationIterationCount: 1,
                }}
              />
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
                    url={currentPokemon?.image}
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
                  <div
                    css={{
                      visibility: showValidationTip ? 'visible' : 'hidden',
                      opacity: showValidationTip ? 1 : 0,
                      width: '140px',
                      height: '100px',
                      backgroundColor: '#555',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '5px 0',
                      borderRadius: '6px',
                      position: 'absolute',
                      zIndex: 30,
                      bottom: '44%',
                      left: '78%',
                      marginLeft: '-60px',
                      transition: 'opacity 0.3s',
                      '&::after': css({
                        content: '""',
                        position: 'absolute',
                        top: '100%',
                        left: '35%',
                        marginLeft: '-5px',
                        borderWidth: '5px',
                        borderStyle: 'solid',
                        borderColor: '#555 transparent transparent transparent',
                      }),
                    }}
                  >
                    <p
                      css={{
                        ...tooltipText,
                        textDecoration: !validation.minChar
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      Char min 4
                    </p>
                    <p
                      css={{
                        ...tooltipText,
                        textDecoration: !validation.maxChar
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      Char max 8
                    </p>
                    <p
                      css={{
                        ...tooltipText,
                        textDecoration: !validation.noSpace
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      no space char
                    </p>
                  </div>
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
