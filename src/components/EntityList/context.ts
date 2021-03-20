import React, { useContext } from 'react';

export const EntityListEditionContext = React.createContext(false);
export const useEditionMode = () => useContext(EntityListEditionContext);
