import React from "react";

import Flex from "common/ui/flex";
import AnimatedInput from "common/components/animated-input";
import Loading from "common/components/loading";
import styles from "./styles.module.scss";

const Test = () => {
  const [email, setEmail] = React.useState("developer.daler@gmail.com");
  const [password, setPassword] = React.useState("05500660MRX");

  return (
    <div className={styles.container}>
      <Flex gap={60} direction="column" align="center">
        <div className={styles.loading}>
          <Loading animated />
        </div>
        <Flex gap={30} direction="column" align="center" width="100%">
          <div className={styles.title}>Конструктор формы</div>
          <Flex
            gap={20}
            direction="column"
            align="stretch"
            width="100%"
            className={styles.flex1}
          >
            <AnimatedInput
              status="pending"
              placeholder="Эл. почта"
              value={email}
              setValue={setEmail}
            />
            <AnimatedInput
              status="pending"
              placeholder="Пароль"
              value={password}
              setValue={setPassword}
              type="password"
              hidden={false}
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default Test;
