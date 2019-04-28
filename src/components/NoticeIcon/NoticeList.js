import React from 'react';
import { Avatar, List } from 'antd';
import classNames from 'classnames';
import styles from './NoticeList.less';

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
  onViewEdit = null,
  showClear = true,
  showViewEdit = false,
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        <div>{emptyText || locale.emptyText}</div>
      </div>
    );
  }
  return (
    <div>
      <List className={styles.list}>
        {data.map((item, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          // eslint-disable-next-line no-nested-ternary
          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={styles.avatar} src={item.avatar} />
            ) : (
              <span className={styles.iconElement}>{item.avatar}</span>
            )
          ) : null;

          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => onClick(item)}>
              <List.Item.Meta
                className={styles.meta}
                avatar={leftIcon}
                title={
                  <div className={styles.title}>
                    {item.title}
                    <div className={styles.extra}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={styles.description} title={item.description}>
                      {item.description}
                    </div>
                    <div className={styles.datetime}>{item.datetime}</div>
                  </div>
                }
              />
            </List.Item>
          );
        })}
      </List>
      <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {locale.clear} {locale[title] || title}
          </div>
        ) : null}
        {showViewEdit ? <div onClick={onViewEdit}>{locale.viewEdit}</div> : null}
      </div>
    </div>
  );
}
