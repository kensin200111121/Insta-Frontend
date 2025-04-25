import { statisticsForStore } from "@/interface/data/home.interface";
import getFormatedNumber, { getPriceNumber } from "@/utils/getFormatedNumber";
import { FC } from "react";

type StatisticsInfoForStoreProps = {
  info: statisticsForStore|undefined
}

const StatisticsInfoForStore: FC<StatisticsInfoForStoreProps> = ({info}) => {
  return (
    <>
      <div className="statistic-item">
        <div className="statistic-item-title">No. of Transactions</div>
        <div className="statistic-item-amount">{getFormatedNumber(info?.totalTransactionCount, 0)}</div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Average Ticket</div>
        <div className="statistic-item-amount text-success">
          {getPriceNumber((info?.totalTransactionAmount || 0) / (info?.totalTransactionCount || 1))}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Difference from Last Week</div>
        <div className="statistic-item-amount">
          {`${getFormatedNumber((info?.lastWeekTransactionInfo || 0) / (info?.todayTransactionInfo || 1))}% & `}
          {getPriceNumber((info?.todayTransactionInfo || 0) - (info?.lastWeekTransactionInfo || 0))}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Yesterday's Sales</div>
        <div className="statistic-item-amount text-danger">
          {`${getFormatedNumber((info?.yesterdayTransactionInfo || 0) / (info?.todayTransactionInfo || 1))}% & `}
          {getPriceNumber((info?.todayTransactionInfo || 0) - (info?.yesterdayTransactionInfo || 0))}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Refund Amount</div>
        <div className="statistic-item-amount">
          ${getFormatedNumber(info?.refundAmount)}
        </div>
      </div>
      <div className="statistic-item">
        <div className="statistic-item-title">Chargeback Amount</div>
        <div className="statistic-item-amount">
          ${getFormatedNumber(info?.chargebackAmount)}
        </div>
      </div>
    </>
  )
}

export default StatisticsInfoForStore;